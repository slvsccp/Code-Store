class Produto {
  constructor() {
    this.id = 1;
    this.arr_produtos = [];
    this.edit_id = null;
  }

  salvar() {
    let produto = this.lerDados();

    if(this.validaCampos(produto)) {
      if(this.edit_id === null) {
        this.adicionar(produto);
      } else {
        this.atualizar(this.edit_id, produto);
      }
    }

    Toastify({
      text: "Operação realizada com sucesso!",
      duration: 2100,
      newWindow: true,
      close: true,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
      style: {
        background: "#28a745",
      },
      onClick: function(){}
    }).showToast();    

    this.populaTabela();
    this.cancelar();
  }

  adicionar(produto) {
    this.arr_produtos.push(produto);
    this.id++;
    // console.log(this.arr_produtos)
  }

  deletar(id) {
    let tbody = document.getElementById("tbody");
    
    if (window.confirm("Deseja realmente excluir este produto?")) {
      for(let i=0; i < this.arr_produtos.length; i++) {
        if(this.arr_produtos[i].id === id) {
          this.arr_produtos.splice(i, 1);
          tbody.deleteRow(i);
        }
      }
    }

    Toastify({
      text: "Item excluído com sucesso!",
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
      style: {
        background: "#fd7e14",
      },
      onClick: function(){}
    }).showToast();
    
    this.populaTabela();
  }

  cancelar() {
    this.edit_id = null;
    
    document.getElementById("produto").value = '';
    document.getElementById("preco").value = '';
    document.getElementById("btn_salvar").textContent = "Salvar";
    this.populaTabela();
  }

  atualizar(id, dado) {
    for(let i=0; i < this.arr_produtos.length; i++) {
      if(this.arr_produtos[i].id === id) {
        this.arr_produtos[i].nome_produto = dado.nome_produto;
        this.arr_produtos[i].preco = dado.preco;
      }
    }
  }

  obterEditarRow(dado) {
    this.edit_id = dado.id;

    document.getElementById("produto").value = dado.nome_produto;
    document.getElementById("preco").value = dado.preco;
    document.getElementById("btn_salvar").textContent = "Atualizar";
  }

  populaTabela() {
    let tbody = document.getElementById("tbody");
    let valor_total = document.querySelector("#valor_total span");
    let total = 0;

    tbody.textContent = '';
    for(let i=0; i < this.arr_produtos.length; i++) {
      // console.log(this.arr_produtos[i]);

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
      td_acoes.innerHTML = `
        <i class="fa-solid fa-pen-to-square" title="Editar" id="editRow${this.arr_produtos[i].id}"></i> 
        <i class="fa-solid fa-trash" title="Excluir" id="deleteRow${this.arr_produtos[i].id}"></i>
      `;

      document.getElementById(`editRow${this.arr_produtos[i].id}`)
      .addEventListener("click", () => {
        this.obterEditarRow(this.arr_produtos[i]);
      });

      document.getElementById(`deleteRow${this.arr_produtos[i].id}`)
      .addEventListener("click", () => {
        this.deletar(this.arr_produtos[i].id);
      });


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