const axios = require('axios');
const FormData = require('form-data');

/**
 * Universal Image Upload to ImgBB
 * Can be used from any controller
 * 
 * @param {Buffer} imageBuffer - Image buffer from multer
 * @param {string} filename - Original filename
 * @param {Object} options - Additional options
 * @returns {Promise<Object>} - Upload response with image data
 */
const uploadToImgBB = async (imageBuffer, filename, options = {}) => {
  try {
    // Validate inputs
    if (!imageBuffer) {
      throw new Error('Image buffer is required');
    }

    if (!process.env.IMGBB_API_KEY) {
      throw new Error('ImgBB API key is not configured');
    }

    // Prepare form data
    const formData = new FormData();
    formData.append('key', process.env.IMGBB_API_KEY);
    formData.append('image', imageBuffer.toString('base64'));
    formData.append('name', options.name || filename || 'image');
    
    // Optional: Set expiration (default: never expires)
    if (options.expiration) {
      formData.append('expiration', options.expiration);
    }

    // Make API request
    const response = await axios.post(process.env.IMGBB_API_URL, formData, {
      headers: {
        ...formData.getHeaders()
      },
      timeout: 30000 // 30 seconds timeout
    });

    // Check response
    if (response.data && response.data.success) {
      return {
        success: true,
        data: {
          url: response.data.data.url,
          displayUrl: response.data.data.display_url,
          deleteUrl: response.data.data.delete_url,
          thumb: response.data.data.thumb,
          medium: response.data.data.medium,
          small: response.data.data.small || response.data.data.thumb,
          filename: response.data.data.image?.filename || filename,
          size: response.data.data.size,
          width: response.data.data.width,
          height: response.data.data.height,
          expiration: response.data.data.expiration,
          id: response.data.data.id,
          title: response.data.data.title,
          description: response.data.data.description
        }
      };
    } else {
      throw new Error('Upload failed: ' + JSON.stringify(response.data));
    }
  } catch (error) {
    console.error('ImgBB Upload Error:', {
      message: error.message,
      response: error.response?.data
    });
    
    // Throw user-friendly error
    throw new Error(
      error.response?.data?.error?.message || 
      error.message || 
      'Failed to upload image to ImgBB'
    );
  }
};

/**
 * Delete image from ImgBB using delete URL
 * 
 * @param {string} deleteUrl - Delete URL from upload response
 * @returns {Promise<boolean>} - True if deleted successfully
 */
const deleteFromImgBB = async (deleteUrl) => {
  try {
    if (!deleteUrl) {
      console.warn('No delete URL provided');
      return false;
    }

    const response = await axios.delete(deleteUrl, {
      timeout: 10000
    });
    
    return response.status === 200 || response.status === 204;
  } catch (error) {
    console.error('ImgBB Delete Error:', error.message);
    // Don't throw error, just log and return false
    return false;
  }
};

/**
 * Get image info from ImgBB
 * 
 * @param {string} imageId - Image ID from ImgBB
 * @returns {Promise<Object>} - Image information
 */
const getImageInfo = async (imageId) => {
  try {
    const response = await axios.get(`https://api.imgbb.com/1/info`, {
      params: {
        key: process.env.IMGBB_API_KEY,
        id: imageId
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('ImgBB Get Info Error:', error.message);
    throw new Error('Failed to get image information');
  }
};

/**
 * Check if API key is valid
 * 
 * @returns {Promise<boolean>} - True if valid
 */
const validateApiKey = async () => {
  try {
    // Try to upload a small test image
    const testBuffer = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
      'base64'
    );
    
    const result = await uploadToImgBB(testBuffer, 'test.png');
    return result.success;
  } catch (error) {
    return false;
  }
};

module.exports = {
  uploadToImgBB,
  deleteFromImgBB,
  getImageInfo,
  validateApiKey
};