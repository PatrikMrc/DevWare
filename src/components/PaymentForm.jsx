import React, { useState, useContext } from 'react';
import './styles/PaymentForm.css';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function PaymentForm() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const title = searchParams.get('title');
  const price = searchParams.get('price');
  const total = searchParams.get('total');

  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    cartao: '',
    validade: '',
  });

  // 🔧 Máscaras manuais
 const formatCPF = (value) => {
  return value
    .replace(/\D/g, '')                       // remove não numéricos
    .replace(/(\d{3})(\d)/, '$1.$2')          // 000.000
    .replace(/(\d{3})(\d)/, '$1.$2')          // 000.000.000
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')    // 000.000.000-00
    .slice(0, 14);                            // limita tamanho
};

  const formatCard = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{4})(?=\d)/g, '$1 ')
      .slice(0, 19);
  };

  const formatValidade = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .slice(0, 5);
  };

  // Atualiza os inputs com máscara
  const handleChange = (e) => {
    const { id, value } = e.target;
    let formattedValue = value;

    if (id === 'cpf') formattedValue = formatCPF(value);
    if (id === 'cartao') formattedValue = formatCard(value);
    if (id === 'validade') formattedValue = formatValidade(value);

    setFormData({ ...formData, [id]: formattedValue });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token || token.trim() === '' || token === 'null' || token === 'undefined') {
      toast.warning('⚠️ Você precisa estar logado para realizar o pagamento.', {
        position: 'top-center',
      });
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    try {
      const response = await axios.post(
        'https://devwareapi.contadinheiro.com/api/premium-subscription',
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
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Resposta da API:', response.data);
      toast.success('✅ Pagamento realizado com sucesso!', {
        position: 'top-center',
      });
      setTimeout(() => navigate('/plataform'), 2000);
    } catch (error) {
      console.error('Erro ao enviar o pagamento:', error);
      if (error.response?.status === 401) {
        toast.error('🔒 Sessão expirada. Faça login novamente.', {
          position: 'top-center',
        });
        setTimeout(() => navigate('/login'), 2000);
      } else {
        toast.error('❌ Erro ao processar o pagamento. Verifique os dados e tente novamente.', {
          position: 'top-center',
        });
      }
    }
  };

  return (
    <div className="card">
      <ToastContainer /> {/* ✅ Contêiner dos toasts */}

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
              type="text"
              id="cpf"
              value={formData.cpf}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cartao">Número do Cartão</label>
            <input
              type="text"
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
