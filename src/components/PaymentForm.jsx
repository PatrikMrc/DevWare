import React from 'react';
import './styles/PaymentForm.css';
import { useSearchParams } from 'react-router-dom';

function PaymentForm() {

  // useSearchParams nos dá acesso aos parâmetros de query da URL
    const [searchParams] = useSearchParams();

    // Captura os valores de 'title', 'price' e 'total' da URL
    const title = searchParams.get('title');
    const price = searchParams.get('price');
    const total = searchParams.get('total');

  return (
    <div className="card">
      <div className="card-header">
        <h1>Finalize Sua Assinatura</h1>
        <p>Confirme seus dados e escolha a forma de pagamento</p>
      </div>

      <div className="form-container">
        <div className="order-summary">
          <h3>Seu Pedido</h3>
          <hr />
          <div className="order-item">
            <span className="item-label">Plano: {title}</span>
            <span className="item-value blue-text">{price}</span>
          </div>
          <hr />
          <div className="order-item">
            <span className="item-label">Valor:</span>
            <span className="item-value blue-text">{price}</span>
          </div>
          <hr />
          <div className="order-item total">
            <span className="item-label">Total: {total},00</span>
          </div>
          <p className="access-info">Acesso Imediato</p>
        </div>

        <div className="payment-details">
          <h3>Detalhes do Pagamento</h3>
          <div className="form-group">
            <label htmlFor="nome">Nome Completo</label>
            <input type="text" id="nome" />
          </div>
          <div className="form-group">
            <label htmlFor="cpf">CPF</label>
            <input type="number" id="cpf" />
          </div>
          <div className="form-group">
            <label htmlFor="cartao">Número do Cartão</label>
            <input type="number" id="cartao" />
          </div>
          <div className="form-group">
            <label htmlFor="validade">Validade (MM/AA)</label>
            <input type="number" id="validade" />
          </div>

          <h4>Método do Pagamento</h4>
          <div className="payment-method-container">
            <label className="radio-label">
              <input type="radio" name="payment-method" defaultChecked />
              Cartão Bancario
            </label>
            <div className="card-icons">
              <span className="card-icon"></span>
              <span className="card-icon"></span>
              <span className="card-icon"></span>
              <span className="card-icon"></span>
            </div>
          </div>

          <button className="confirm-button">Confirmar e Pagar</button>
          <p className="terms-text">
            Ao confirmar, você concorda com nossos <a href="#" className="terms-link">Termos de Uso</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default PaymentForm;