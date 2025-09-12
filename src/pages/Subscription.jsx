import React from 'react';
import PlanCard from '../components/PlanCard';
import './styles/Subscription.css';

function SubscriptionPage() {
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
                        />

                        {/* Renderiza o Cartão Anual */}
                        <PlanCard
                            title="Plano Anual"
                            price="R$ 500/ano"
                            description="Economize e tenha acesso ilimitado por um ano."
                            isFeatured={true}
                        />

                    </div>
                </div>
            </section>
        </main>
    );
}

export default SubscriptionPage;