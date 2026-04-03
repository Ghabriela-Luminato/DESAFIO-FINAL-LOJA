export async function getCepData(cep) {
  const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  return res.json();
}