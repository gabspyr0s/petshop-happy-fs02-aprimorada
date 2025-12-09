/* scripts.js - lógica JS do projeto
   - Validação do formulário (Bootstrap custom)
   - Exibição condicional do endereço de tele-busca
   - Prevenção de datas passadas no agendamento
   - Simulação de "salvar" agendamento (apenas mensagem na página)
*/

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('cadastroForm');
  if (form) {
    const telebusca = document.getElementById('telebusca');
    const entrega = document.getElementById('entrega-local');
    const enderecoDiv = document.getElementById('telebuscaEndereco');

    function toggleEndereco() {
      if (telebusca.checked) enderecoDiv.style.display = 'block';
      else enderecoDiv.style.display = 'none';
    }

    if (telebusca && entrega) {
      telebusca.addEventListener('change', toggleEndereco);
      entrega.addEventListener('change', toggleEndereco);
    }

    // Prevent selecting past dates
    const dataInput = document.getElementById('dataAgendamento');
    if (dataInput) {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const dd = String(today.getDate()).padStart(2, '0');
      dataInput.min = f"{yyyy}-{mm}-{dd}"
    }

    // Form submission handler with Bootstrap validation
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      e.stopPropagation();

      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
      }

      // Collect values
      const nome = document.getElementById('nome').value;
      const nomePet = document.getElementById('nomePet').value;
      const servico = document.getElementById('servico').value;
      const metodoEl = document.querySelector('input[name="metodo"]:checked');
      const metodo = metodoEl ? metodoEl.value : '';
      const data = document.getElementById('dataAgendamento').value;
      const hora = document.getElementById('horaAgendamento').value;

      // Simulate saving (in a real app you'd call an API)
      const mensagemSucesso = document.getElementById('mensagemSucesso');
      mensagemSucesso.style.display = 'block';
      mensagemSucesso.textContent = `Agendamento realizado com sucesso. Cliente: ${nome} - Pet: ${nomePet} - Serviço: ${servico} - Método: ${metodo} - Data/Hora: ${data} ${hora}`;

      // Reset form
      form.reset();
      form.classList.remove('was-validated');
      enderecoDiv.style.display = 'none';
    });
  }
});
