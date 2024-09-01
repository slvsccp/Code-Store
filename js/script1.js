class Produto {
  constructor() {
    this.id = 1;
    this.arr_produtos = [];
  }

  salvar() {
    let produto = this.lerDados();

    if(this.validaCampos(produto)) {
      this.adicionar(produto);
    }

    this.populaTabela();
    this.cancelar();
  }

  adicionar(produto) {
    this.arr_produtos.push(produto);
    this.id++;
    console.log(this.arr_produtos)
  }

  deletar(id) {
    let tbody = document.getElementById("tbody");
  
    for(let i=0; i < this.arr_produtos.length; i++) {
      if(this.arr_produtos[i].id === id) {
        if (window.confirm("Deseja realmente excluir este produto?")) {
          this.arr_produtos.splice(i, 1);
          tbody.deleteRow(i);
        }
      }
    }
  }

  cancelar() {
    document.getElementById("produto").value = '';
    document.getElementById("preco").value = '';
  }

  populaTabela() {
    let tbody = document.getElementById("tbody");
    let valor_total = document.querySelector("#valor_total span");
    let total = 0;

    tbody.textContent = '';
    for(let i=0; i < this.arr_produtos.length; i++) {
      console.log(this.arr_produtos[i]);

      let tr = tbody.insertRow();

      let td_id = tr.insertCell();
      let td_produto = tr.insertCell();
      let td_preco = tr.insertCell();
      let td_acoes = tr.insertCell();

      td_acoes.classList.add("actions");
      td_produto.classList.add("text-left");

      td_id.textContent = this.arr_produtos[i].id;
      td_produto.textContent = this.arr_produtos[i].nome_produto;
      td_preco.textContent = this.formatarNumero(parseFloat(this.arr_produtos[i].preco));
      td_acoes.innerHTML = `<i class="fa-solid fa-pen-to-square"></i> <i class="fa-solid fa-trash" onclick="produto.deletar(${this.arr_produtos[i].id});"></i>`;

      total += parseFloat(this.arr_produtos[i].preco);

    }

    valor_total.textContent = this.formatarNumero(total);
  }

  lerDados() {
    let produto = {};

    produto.id = this.id;
    produto.nome_produto = document.getElementById("produto").value;
    produto.preco = document.getElementById("preco").value;

    return produto;
  }

  validaCampos(produto) {
    let msg = '';

    if(produto.nome_produto == '') {
      msg += 'Informe o nome do produto.';
    } else if(produto.preco == '') {
      msg += 'Informe o preço do produto.'
    } else if(!Number(produto.preco)) {
      msg += 'Informe um valor válido.'
    }

    if(msg != '') {
      alert(msg);
      return false;
    }

    return true;

  }

  formatarNumero(numero) {
    // Converte o número para o formato com separador de milhar e vírgula como decimal
    let partes = numero.toFixed(2).split('.');
    let inteiro = partes[0];
    let decimal = partes[1];

    // Adiciona o separador de milhar
    inteiro = inteiro.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    // Junta as partes e adiciona o símbolo da moeda
    return `R$ ${inteiro},${decimal}`;
  }

}

let produto = new Produto();