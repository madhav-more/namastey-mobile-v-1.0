import * as ImagePicker from 'expo-image-picker';
import { Alert, Linking } from 'react-native';

class PermissionService {
  /**
   * Request Camera Permissions
   * @returns {Promise<boolean>}
   */
  async requestCameraPermission() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      this.showPermissionAlert(
        'Camera Permission',
        'Namastey needs camera access to take profile photos. Please enable it in settings.'
      );
      return false;
    }
    return true;
  }

  /**
   * Request Media Library (Gallery) Permissions
   * @returns {Promise<boolean>}
   */
  async requestGalleryPermission() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      this.showPermissionAlert(
        'Gallery Permission',
        'Namastey needs access to your photos to choose a profile picture. Please enable it in settings.'
      );
      return false;
    }
    return true;
  }

  /**
   * Show alert if permission is denied
   */
  showPermissionAlert(title, message) {
    Alert.alert(
      title,
      message,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Open Settings', onPress: () => Linking.openSettings() },
      ],
      { cancelable: true }
    );
  }

  /**
   * Check if camera permission is already granted
   */
  async checkCameraPermission() {
    const { status } = await ImagePicker.getCameraPermissionsAsync();
    return status === 'granted';
  }

  /**
   * Check if gallery permission is already granted
   */
  async checkGalleryPermission() {
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    return status === 'granted';
  }
}

export default new PermissionService();
