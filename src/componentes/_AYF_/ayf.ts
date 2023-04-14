const tryGetVersionErp = () => {
    const regex = /v(\d)?/gi;
    const  pathname = window.parent.location.pathname || window.location.pathname;
  
    const arr = regex.exec(pathname)
    let version = ''
  
    if (arr?.length)
      version = arr[0];
  
    return version;
  }
  
  const tryGetURL = () => {
    const origin = window.location.origin;
    const regex = /sinco(\w+)?/gi;
    const arr = regex.exec(window.location.pathname)
    let site = ''
  
    if (arr?.length)
      site = arr[0];
  
    return `${origin}/${site}`;
  }
  
  const tryGetToken = async (attemps: number = 3) => {
    let _attempts = attemps;
    let token = '';
    let parent: any = window.parent;
  
    while (token === '' && _attempts > 0) {
      if (parent?.getToken){
        token = parent.getToken();
      }
  
      parent = parent?.parent;
      _attempts -= 1;
    }
    
    if (!token) {
        const respuestaMarco = await fetch("/marco/session");
        if (respuestaMarco.ok) {
            const parametrosSesion = await respuestaMarco.json();
            token = parametrosSesion.token;
        }
    }
    return (token || '');
  }
  
  const resolveToken = () => {
    const win = (window as any);
    if (win.getToken)
      return win.getToken()
  
    return tryGetToken();
  }
  
  const resolveURL = (): string => {
    if (process.env.NODE_ENV === 'production')
      return tryGetURL()
  
    return process.env.HOST || ''
  }
  
  const resolveVersionErp = () => {
    return tryGetVersionErp();
  }
  
  const siteUrl = resolveURL();
  const version_erp = resolveVersionErp();
  
  const AYF: AYF = {
    // APP_NAME: packageJson.name || 'configuracion',
    APP_NAME: 'prueba',
    APP_VERSION: "0.1.0",
    // APP_VERSION: packageJson.version,
    BUILD_MODE_PRODUCTION: process.env.NODE_ENV === 'production',
    SITE_URL: siteUrl,
    TOKEN: resolveToken(),
    VERSION_ERP: version_erp,
    BASE_URL: siteUrl + '/' + version_erp
  }
  
  
  export default AYF;
  