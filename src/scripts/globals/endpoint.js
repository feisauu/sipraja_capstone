import CONFIG from './config';

const ENDPOINT = {
// POST register
  REGISTER: `${CONFIG.REPORT}user/register`,
  LOGIN: `${CONFIG.REPORT}user/login`,
  CREATELAPORAN: `${CONFIG.REPORT}laporan/create`,
  GETLAPORAN: `${CONFIG.REPORT}laporan/`,
};

export default ENDPOINT;
