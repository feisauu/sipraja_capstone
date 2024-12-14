import CONFIG from './config';

const ENDPOINT = {
// POST register
  REGISTER: `${CONFIG.REPORT}user/register`,
  LOGIN: `${CONFIG.REPORT}user/login`,
  CREATELAPORAN: `${CONFIG.REPORT}laporan/create`,
  GETLAPORAN: `${CONFIG.REPORT}laporan/`,
  SEARCHLAPORAN: `${CONFIG.REPORT}search`,
  GETPROFIL: `${CONFIG.REPORT}user`,
  UPDATEPROFIL: 'https://backend-sipraja.vercel.app/api/v1/user/profile',
  PUTLAPORAN: `${CONFIG.REPORT}laporan/`,
  UPDATEPASSWORD: `${CONFIG.REPORT}user/password`,
  RESET_PASSWORD:`${CONFIG.REPORT}reset/reset-password/`,
};

export default ENDPOINT;
