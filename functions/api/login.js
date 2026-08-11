export const onRequestPost = async ({ request }) => {
  // Ten endpoint teraz nie jest używany — logika walidacji kodu jest po stronie klienta.
  // Zostawiony jako placeholder żeby nie było 404.
  return new Response(JSON.stringify({ error: 'use_client_validation' }), {
    status: 410,
    headers: { 'Content-Type': 'application/json' }
  });
};
