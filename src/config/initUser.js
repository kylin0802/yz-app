let initUser = null;
try {
  console.log('现在已经绑定 appTakePhoto');

  initUser = JSON.parse(window.jsInterface.getUserInfo());
  console.log('安卓获取', initUser);
} catch (err) {
  initUser = {
    password: 'password003',
    personId: 'Pa5ec091ab78e4c22a46a28eeea891851',
    userName: '1356669999',
    status: 'localhost'
  };
}

export default initUser;
