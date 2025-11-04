import React, { useState, useContext } from 'react';
import './styles/PaymentForm.css';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

function PaymentForm() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext); // pega o token do contexto global
  // Captura os valores da URL
  const title = searchParams.get('title');
  const price = searchParams.get('price');
  const total = searchParams.get('total');

  // Estado do formulário
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    cartao: '',
    validade: '',
  });

  // Atualiza os inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Envia os dados à API
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert('Você precisa estar logado para realizar o pagamento.');
      navigate('/login');
      return;
    }

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/premium-subscription',
        {
          name: formData.nome,
          cpf: formData.cpf,
          cartao: formData.cartao,
          validade: formData.validade,
          plano: title,
          preco: price,
          total: total,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ token no cabeçalho
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Resposta da API:', response.data);
      alert('Pagamento realizado com sucesso!');
      navigate('/plataform');
    } catch (error) {
      console.error('Erro ao enviar o pagamento:', error);
      if (error.response?.status === 401) {
        alert('Sessão expirada. Faça login novamente.');
        navigate('/login');
      } else {
        alert('Erro ao processar o pagamento. Verifique os dados e tente novamente.');
      }
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h1>Finalize Sua Assinatura</h1>
        <p>Confirme seus dados e escolha a forma de pagamento</p>
      </div>

      <form className="form-container" onSubmit={handleSubmit}>
        <div className="order-summary">
          <h3>Seu Pedido</h3>
          <hr />
          <div className="order-item">
            <span className="item-label">Plano:</span>
            <span className="item-value blue-text">{title}</span>
          </div>
          <hr />
          <div className="order-item">
            <span className="item-label">Valor:</span>
            <span className="item-value blue-text">{price}</span>
          </div>
          <hr />
          <div className="order-item total">
            <span className="item-label">Total:</span>
            <span className="item-value blue-text">{total},00</span>
          </div>
          <p className="access-info">Acesso Imediato</p>
        </div>

        <div className="payment-details">
          <h3>Detalhes do Pagamento</h3>

          <div className="form-group">
            <label htmlFor="nome">Nome Completo</label>
            <input
              type="text"
              id="nome"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cpf">CPF</label>
            <input
              type="number"
              id="cpf"
              value={formData.cpf}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cartao">Número do Cartão</label>
            <input
              type="number"
              id="cartao"
              value={formData.cartao}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="validade">Validade (MM/AA)</label>
            <input
              type="text"
              id="validade"
              value={formData.validade}
              onChange={handleChange}
              placeholder="MM/AA"
              required
            />
          </div>

          <h4>Método do Pagamento</h4>
          <div className="payment-method-container">
            <label className="radio-label">
              <input type="radio" name="payment-method" defaultChecked />
              Cartão Bancário
            </label>
          </div>

          <button type="submit" className="confirm-button">
            Confirmar e Pagar
          </button>
          <p className="terms-text">
            Ao confirmar, você concorda com nossos{' '}
            <a href="#" className="terms-link">Termos de Uso</a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default PaymentForm;
