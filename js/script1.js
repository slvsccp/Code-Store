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

    // console.log(produto);
  }

  adicionar(produto) {
    this.arr_produtos.push(produto);
    this.id++

    console.log(this.arr_produtos)
  }

  cancelar() {

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
    }

    if(msg != '') {
      alert(msg);
      return false;
    }

    return true;

  }

}

let produto = new Produto();