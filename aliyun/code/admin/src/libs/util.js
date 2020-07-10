import axios from 'axios';

let util = {};

util.title = function (title) {
  title = title ? title : '天行健 后台';
  window.document.title = title;
};

const ajaxUrl = process.env.NODE_ENV === 'development' ?
  'http://localhost:30001/api' :
  'https://www.boblog.com/api';

util.ajax_url = ajaxUrl;

util.ajax = axios.create({
  baseURL: ajaxUrl,
  timeout: 30000
});

export default util;
