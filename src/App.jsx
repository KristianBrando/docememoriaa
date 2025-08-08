import React, { useState } from 'react'
import { Heart, Cake, Phone, Gift, Star, Instagram, MapPin, Clock, MessageCircle } from 'lucide-react'
import CakeOrderForm from './components/CakeOrderForm'
import ProductCatalog from './components/ProductCatalog'
import './App.css'

// Importando as imagens
import brownieImg from './assets/1000177323.png'
import cookieImg from './assets/1000177316.png'
import beijinhoImg from './assets/1000177317.png'
import morangoImg from './assets/1000177310.png'
import trufasImg from './assets/1000177314.png'
import brigadeirosImg from './assets/1000177311.png'
import bolo1Img from './assets/1000177315.png'
import bolo2Img from './assets/1000177313.png'
import logoImg from './assets/logo.png'
import presenteMiniTrufasImg from './assets/presente_mini_trufas.png'
import presenteMiniBoloImg from './assets/presente_mini_bolo.png'
import presente12BrigadeirosImg from './assets/presente_12_brigadeiros.png'
import presente25UnidadesImg from './assets/presente_25_unidades.png'
import presente10MorangosImg from './assets/presente_10_morangos.png'

function App() {
  const [activeSection, setActiveSection] = useState('inicio')
  const [showOrderForm, setShowOrderForm] = useState(false)
  const [showPresentesSection, setShowPresentesSection] = useState(false)
  const [showProductCatalog, setShowProductCatalog] = useState(false)
  const whatsappNumber = "5547999484461"

  const presentes = [
    {
      id: 1,
      name: "Caixa Presenteável Mini Trufas",
      price: "33,00",
      image: presente12BrigadeirosImg,
      description: "Caixa com mini trufas variadas."
    },
    {
      id: 2,
      name: "Caixa Presenteável Mini Bolo",
      price: "42,00",
      image: presenteMiniTrufasImg,
      description: "Caixa com mini bolo e acompanhamentos."
    },
    {
      id: 3,
      name: "Caixa com 12 Brigadeiros",
      price: "24,00",
      image: presente10MorangosImg,
      description: "Caixa com 12 brigadeiros gourmet."
    },
    {
      id: 4,
      name: "Caixa Presenteável 25 Unidades",
      price: "24,00",
      image: presente25UnidadesImg,
      description: "Caixa com 25 unidades de doces variados."
    },
    {
      id: 5,
      name: "10 Mini Morangos do Amor",
      price: "78,00",
      image: presenteMiniBoloImg,
      description: "10 unidades de mini morangos do amor."
    },
  ]

  const handleWhatsAppClick = (productName = null, productPrice = null) => {
    let message = ""
    
    if (productName && productPrice) {
      message = `Olá! Gostaria de fazer um pedido de ${productName} (R$ ${productPrice}) da Doce Memória. Podem me ajudar com informações sobre disponibilidade?`
    } else if (productName) {
      message = `Olá! Gostaria de fazer um pedido de ${productName} da Doce Memória. Podem me ajudar com informações sobre preços e disponibilidade?`
    } else {
      message = "Olá! Gostaria de fazer um pedido na Doce Memória. Podem me ajudar?"
    }
    
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const handleScheduleClick = () => {
    const message = "Olá! Gostaria de agendar um horário para retirada de encomenda na Doce Memória. Podem me ajudar com os horários disponíveis?"
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }

  const mostPedidos = [
    {
      id: 1,
      name: 'Brownie Recheado',
      image: brownieImg,
      description: 'Brownie artesanal com recheio cremoso e açúcar de confeiteiro',
      price: 'A partir de R$ 8,00'
    },
    {
      id: 2,
      name: 'Cookies Gourmet',
      image: cookieImg,
      description: 'Cookies crocantes com gotas de chocolate ao leite e meio amargo',
      price: 'A partir de R$ 6,00'
    },
    {
      id: 3,
      name: 'Beijinho Premium',
      image: beijinhoImg,
      description: 'Beijinhos brancos com recheio de maracujá e coco ralado',
      price: 'A partir de R$ 4,00'
    },
    {
      id: 4,
      name: 'Morango do Amor',
      image: morangoImg,
      description: 'Morangos cobertos com chocolate especial em embalagem temática',
      price: 'A partir de R$ 15,00'
    }
  ]

  const cardapio = [
    {
      id: 5,
      name: 'Trufas Artesanais',
      image: trufasImg,
      description: 'Trufas de chocolate com acabamento refinado',
      price: 'A partir de R$ 25,00'
    },
    {
      id: 6,
      name: 'Brigadeiros Gourmet',
      image: brigadeirosImg,
      description: 'Variedade de brigadeiros com coberturas especiais',
      price: 'A partir de R$ 20,00'
    },
    {
      id: 7,
      name: 'Bolo Dois Amores',
      image: bolo1Img,
      description: 'Bolo especial com morangos frescos e bombons',
      price: 'A partir de R$ 45,00'
    },
    {
      id: 8,
      name: 'Bolos Personalizados',
      image: bolo2Img,
      description: 'Bolos temáticos para ocasiões especiais',
      price: 'Sob consulta'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50" style={{backgroundColor: '#f5f3f7'}}>
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b-2" style={{borderColor: '#d4a574'}}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden bg-white shadow-md">
                <img src={logoImg} alt="Doce Memória Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <h1 className="text-lg md:text-2xl font-bold" style={{color: '#8b4513', fontFamily: 'cursive'}}>Doce Memória</h1>
                <p className="text-xs md:text-sm tracking-widest" style={{color: '#d4a574', fontFamily: 'sans-serif', letterSpacing: '0.2em'}}>DOCERIA</p>
              </div>
            </div>
            <nav className="flex space-x-2 md:space-x-6">
              <button 
                onClick={() => setActiveSection('inicio')}
                className={`px-2 md:px-4 py-2 rounded-lg transition-all font-medium text-sm md:text-base ${activeSection === 'inicio' ? 'text-white' : 'hover:bg-pink-50'}`}
                style={{
                  backgroundColor: activeSection === 'inicio' ? '#d4a574' : 'transparent',
                  color: activeSection === 'inicio' ? 'white' : '#8b4513'
                }}
              >
                Início
              </button>
              <button 
                onClick={() => setActiveSection('sobre')}
                className={`px-2 md:px-4 py-2 rounded-lg transition-all font-medium text-sm md:text-base ${activeSection === 'sobre' ? 'text-white' : 'hover:bg-pink-50'}`}
                style={{
                  backgroundColor: activeSection === 'sobre' ? '#d4a574' : 'transparent',
                  color: activeSection === 'sobre' ? 'white' : '#8b4513'
                }}
              >
                Sobre
              </button>
              <button 
                onClick={() => setActiveSection('contato')}
                className={`px-2 md:px-4 py-2 rounded-lg transition-all font-medium text-sm md:text-base ${activeSection === 'contato' ? 'text-white' : 'hover:bg-pink-50'}`}
                style={{
                  backgroundColor: activeSection === 'contato' ? '#d4a574' : 'transparent',
                  color: activeSection === 'contato' ? 'white' : '#8b4513'
                }}
              >
                Contato
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section - Linktree Style */}
      {activeSection === 'inicio' && (
        <section className="min-h-screen flex flex-col items-center justify-center px-4 py-8" style={{background: 'linear-gradient(135deg, #f5f1eb 0%, #e8ddd4 100%)'}}>
          <div className="w-full max-w-md mx-auto text-center">
            {/* Profile Section */}
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-white shadow-lg">
                <img src={logoImg} alt="Doce Memória Logo" className="w-full h-full object-cover" />
              </div>
              <h1 className="text-3xl font-bold mb-2" style={{color: '#8b4513', fontFamily: 'cursive'}}>@doce.memoriaa</h1>
              <p className="text-lg text-gray-600 mb-6">Transformando momentos em doces memórias</p>
            </div>

            {/* Link Buttons - Linktree Style */}
            <div className="space-y-4">
              <button 
                onClick={() => setShowPresentesSection(true)}
                className="w-full text-white px-6 py-4 text-lg font-medium rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 flex items-center justify-center"
                style={{backgroundColor: '#d4a574'}}
              >
                <Gift className="w-5 h-5 mr-3" />
                Caixas Presenteáveis
              </button>
              
              <button 
                onClick={() => setShowOrderForm(true)}
                className="w-full text-white px-6 py-4 text-lg font-medium rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 flex items-center justify-center"
                style={{backgroundColor: '#d4a574'}}
              >
                <Cake className="w-5 h-5 mr-3" />
                Doces e Bolos de Festa
              </button>
              
              <button 
                onClick={() => window.open("https://drive.google.com/file/d/1ZzSa7qwZlvH8Q2d5furUs6c83sz1azKj/view?usp=drive_link", "_blank")}
                className="w-full text-white px-6 py-4 text-lg font-medium rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 flex items-center justify-center"
                style={{backgroundColor: '#e8b4cb'}}
              >
                <MessageCircle className="w-5 h-5 mr-3" />
                Doces para Delivery
              </button>
            </div>

            {/* Social Links */}
            <div className="mt-8 flex justify-center space-x-4">
              <button 
                onClick={() => window.open('https://instagram.com/doce.memoriaa', '_blank')}
                className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all" 
                style={{backgroundColor: '#8b4513'}}
              >
                <Instagram className="w-6 h-6 text-white" />
              </button>
              <button 
                onClick={() => window.open('tel:+554799914302', '_self')}
                className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all" 
                style={{backgroundColor: '#d4a574'}}
              >
                <Phone className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Sobre Section */}
      {activeSection === 'sobre' && (
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-8" style={{color: '#8b4513'}}>Sobre a Doce Memória</h2>
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border-2" style={{borderColor: '#f0e6f7'}}>
                <div className="mb-6">
                  <img src={logoImg} alt="Doce Memória" className="w-24 h-24 mx-auto mb-4 object-contain" />
                </div>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Fundada pela confeiteira Vitória Souza, a Doce Memória nasceu do sonho de criar doces que despertam emoções e criam memórias afetivas. Cada receita é desenvolvida com carinho, utilizando ingredientes selecionados e técnicas artesanais.
                </p>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Especializamos em bombons artesanais, brigadeiros gourmet, bolos decorados, brownies irresistíveis e nosso famoso morango do amor. Também criamos caixas temáticas personalizadas para presentes especiais.
                </p>
                <div className="rounded-xl p-6" style={{backgroundColor: '#f0e6f7'}}>
                  <div className="flex items-center justify-center mb-4">
                    <Heart className="w-8 h-8 mr-2" style={{color: '#e8b4cb'}} />
                    <span className="text-2xl font-bold" style={{color: '#8b4513'}}>Mais de 1000</span>
                  </div>
                  <p className="text-lg text-gray-600">clientes satisfeitos</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contato Section */}
      {activeSection === 'contato' && (
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold mb-8 text-center" style={{color: '#8b4513'}}>Entre em Contato</h2>
              <p className="text-lg text-gray-600 mb-12 text-center">
                Faça seu pedido ou tire suas dúvidas. Estamos prontos para criar doces memórias para você!
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl shadow-lg p-8 border-2" style={{borderColor: '#f0e6f7'}}>
                  <h3 className="text-2xl font-bold mb-6 flex items-center" style={{color: '#8b4513'}}>
                    <MapPin className="w-6 h-6 mr-2" style={{color: '#d4a574'}} />
                    Localização
                  </h3>
                  <p className="text-gray-600 mb-4">Itapoá - SC</p>
                  <p className="text-sm text-gray-500">Entrega local disponível</p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-8 border-2" style={{borderColor: '#f0e6f7'}}>
                  <h3 className="text-2xl font-bold mb-6 flex items-center" style={{color: '#8b4513'}}>
                    <Clock className="w-6 h-6 mr-2" style={{color: '#d4a574'}} />
                    Horário de Atendimento
                  </h3>
                  <p className="text-gray-600 mb-2">Segunda a Sábado</p>
                  <p className="text-gray-600 mb-4">8h às 18h</p>
                  <p className="text-sm text-gray-500">Encomendas com antecedência</p>
                </div>
              </div>

              <div className="mt-8 text-center">
                <div className="bg-white rounded-2xl shadow-lg p-8 border-2" style={{borderColor: '#f0e6f7'}}>
                  <h3 className="text-2xl font-bold mb-6" style={{color: '#8b4513'}}>Faça seu Pedido</h3>
                  <div className="mb-6">
                    <p className="text-lg font-medium mb-2" style={{color: '#8b4513'}}>WhatsApp</p>
                    <p className="text-xl font-bold" style={{color: '#d4a574'}}>(47) 99948-4461</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button 
                      onClick={() => handleWhatsAppClick()}
                      className="text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                      style={{backgroundColor: '#d4a574'}}
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      Fazer Pedido
                    </button>
                    <button 
                      onClick={handleScheduleClick}
                      className="text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                      style={{backgroundColor: '#e8b4cb'}}
                    >
                      <Clock className="w-5 h-5 mr-2" />
                      Agendar Retirada
                    </button>
                    <button 
                      onClick={() => window.open('https://instagram.com/doce.memoriaa', '_blank')}
                      className="px-8 py-3 rounded-xl border-2 hover:shadow-lg transition-all"
                      style={{borderColor: '#e8b4cb', color: '#8b4513'}}
                    >
                      <Instagram className="w-5 h-5 mr-2" />
                      Instagram
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="text-white py-8 px-4" style={{backgroundColor: '#8b4513'}}>
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <img src={logoImg} alt="Doce Memória" className="w-12 h-12 mr-3 object-contain filter brightness-0 invert" />
            <span className="text-xl font-bold">Doce Memória</span>
          </div>
          <p className="mb-4" style={{color: '#d4a574'}}>Transformando momentos em doces memórias</p>
          <p className="text-sm opacity-75">© 2024 Doce Memória - Todos os direitos reservados</p>
        </div>
      </footer>

      {/* Presentes Section */}
      {showPresentesSection && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setShowPresentesSection(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-4xl font-bold mb-8 text-center" style={{color: '#8b4513'}}>
              <Gift className="w-10 h-10 inline-block text-pink-500 mr-2" />
              Doces para Presentear
            </h2>
            <p className="text-center text-gray-600 mb-8">Surpreenda quem você ama com nossos doces finos e caixas presenteáveis!</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {presentes.map((presente) => (
                <div key={presente.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border-2" style={{borderColor: '#f0e6f7'}}>
                  <img src={presente.image} alt={presente.name} className="w-full h-48 object-cover" />
                  <div className="p-4 text-center">
                    <h3 className="text-xl font-semibold mb-2" style={{color: '#8b4513'}}>{presente.name}</h3>
                    <p className="text-gray-700 mb-3">{presente.description}</p>
                    <p className="text-2xl font-bold mb-4" style={{color: '#e8b4cb'}}>R$ {presente.price}</p>
                    <button 
                      onClick={() => handleWhatsAppClick(presente.name, presente.price)}
                      className="w-full text-white px-3 py-1.5 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 text-sm"
                      style={{backgroundColor: '#d4a574'}}
                    >
                      <Phone className="w-4 h-4 mr-1 inline" />
                      Pedir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Order Form Modal */}
      {showOrderForm && (
        <CakeOrderForm onClose={() => setShowOrderForm(false)} />
      )}

      {/* Product Catalog Modal */}
      {showProductCatalog && (
        <ProductCatalog 
          isOpen={showProductCatalog} 
          onClose={() => setShowProductCatalog(false)}
          onWhatsAppClick={handleWhatsAppClick}
          products={[...mostPedidos, ...cardapio]}
        />
      )}
    </div>
  )
}

export default App

