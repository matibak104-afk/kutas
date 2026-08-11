export const onRequest = async ({ request, next }) => {
  const url = new URL(request.url);
  const path = url.pathname;

  // --- Ścieżki publiczne ---
  const publicPaths = [
    '/login.html',
    '/api/request-code',
    '/api/login',
    '/api/logout',
  ];

  const isAsset = /\.(css|js|png|jpg|jpeg|gif|svg|ico|woff2?|ttf|eot|webp|mp4)$/i.test(path);

  // Root → login
  if (path === '/' || path === '/index.html') {
    return Response.redirect(new URL('/login.html', url), 302);
  }

  // Publiczne + assety → przepuść
  if (publicPaths.includes(path) || isAsset) {
    if (path.startsWith('/admin') || path.startsWith('/api/admin')) {
      return handleAdminGuard(request, url, path, next);
    }
    return next();
  }

  // Admin guard
  if (path.startsWith('/admin') || path.startsWith('/api/admin')) {
    return handleAdminGuard(request, url, path, next);
  }

  // Reszta stron — po prostu przepuść (walidacja sesji po stronie klienta via localStorage)
  return next();
};

function parseCookies(cookieHeader) {
  return Object.fromEntries(
    (cookieHeader || '')
      .split(';')
      .map(c => c.trim().split('=').map(decodeURIComponent))
      .filter(([k]) => k)
  );
}

function handleAdminGuard(request, url, path, next) {
  const m = request.method.toUpperCase();
  const isAdminLogin = path === '/api/admin/login' && m === 'POST';
  const isAdminLanding = path === '/admin/index.html' && m === 'GET';

  if (!isAdminLogin && !isAdminLanding) {
    const cookies = parseCookies(request.headers.get('Cookie'));
    if (!cookies.admin_sid) {
      if (path.startsWith('/api/')) {
        return new Response(JSON.stringify({ error: 'admin_unauthorized' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      return Response.redirect(new URL('/admin/index.html', url), 302);
    }
  }
  return next();
}
