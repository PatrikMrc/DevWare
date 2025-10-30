import React from 'react';
import PlanCard from '../components/PlanCard';
import './styles/Subscription.css';
import { useNavigate } from 'react-router-dom';


function SubscriptionPage() {
    const navigate = useNavigate();
    const plans = {
        'Plano Mensal': {
            title: 'Plano Mensal',
            price: 'R$ 50/mês',
            total: 50.00,
        },
        'Plano Anual': {
            title: 'Plano Anual',
            price: 'R$ 500/ano',
            total: 500.00,
        }
    };

    // A função é chamada quando um plano é selecionado
     const handleSelectPlan = (planTitle) => {
    const selectedPlan = plans[planTitle];

    if (selectedPlan) {
      // Monta a URL com os parâmetros
        const queryParams = new URLSearchParams({
            title: selectedPlan.title,
            price: selectedPlan.price,
            total: selectedPlan.total
        }).toString();

      // Redireciona para a página de pagamento com os dados do plano
      navigate(`/payment?${queryParams}`);
    }
  };

    return (
        <main className="subscription-main">
            <section className="subscription-section">
                <div className="container">
                    <h1>Escolha o Plano Perfeito Para Você</h1>
                    <div className="subscription-plans">
                        
                        {/* Renderiza o Cartão Mensal */}
                        <PlanCard
                            title="Plano Mensal"
                            price="R$ 50/mês"
                            description="Flexibilidade para aprender no seu ritmo."
                            isFeatured={false}
                            onSelect={() => handleSelectPlan('Plano Mensal')} 
                        />

                        {/* Renderiza o Cartão Anual */}
                        <PlanCard
                            title="Plano Anual"
                            price="R$ 500/ano"
                            description="Economize e tenha acesso ilimitado por um ano."
                            isFeatured={true}
                            onSelect={() => handleSelectPlan('Plano Anual')}
                        />

                    </div>
                </div>
            </section>
        </main>
    );
}

export default SubscriptionPage;