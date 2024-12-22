
import { Platform, NativeModules } from 'react-native';

const { AndroidConstants } = NativeModules;

// Kiểm tra nếu là máy ảo Android
const isEmulator = AndroidConstants?.isTestDevice || false;

// Kiểm tra nếu là Android Emulator
const isAndroidEmulator = Platform.OS === 'android' && isEmulator;


// Thiết lập URL dựa trên môi trường
export const BASE_URL = isAndroidEmulator ? 'http://10.0.2.2:3000/api' : 'http://192.168.20.88:3000/api';
export const SOCKET_URL = isAndroidEmulator ? 'http://10.0.2.2:3000/' : 'http://192.168.20.88:3000/';
export const GOONG_MAP_API = 'Ng5AqgF6x59fJN2N7YwgP3JmStx22wDef0xwiB9W'


// USE NETWORK IP OR HOSTED URL
// export const BASE_URL = 'http://192.168.1.14:3000/api';
// export const SOCKET_URL = 'http://192.168.1.14:3000/api';