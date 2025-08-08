import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Separator } from '@/components/ui/separator.jsx'
import { 
  Clock, 
  CreditCard, 
  MapPin, 
  AlertTriangle, 
  CheckCircle, 
  Cake,
  Heart,
  Gift,
  Plus,
  Minus,
  ShoppingCart
} from 'lucide-react'
import brigadeiroTradicionalImg from '../assets/1000177311.png'
import brigadeiroGourmetImg from '/brigadeirodecrurroseninho.jpg'
import boloTopoImg from '/boloconfeitado+topo.jpg'
import boloUnicornioImg from '/boloconfeitado+topounicornio.jpg'
import boloSimplesImg from '/boloconfeitadosimples.jpg'
import brigadeiroNesquikImg from '/brnesquik.jpg'
import brigadeiroNinhoChurrosImg from '/brigadeirodecrurroseninho.jpg'
import brigadeiroDoisAmoresImg from '/brdoisamores.jpg'

const CakeOrderForm = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [orderData, setOrderData] = useState({
    size: null,
    mass: null,
    fillings: [],
    decoration: {
      included: true,
      extras: []
    },
    brigadeiros: {
      wanted: false,
      traditional: { quantity: 0, flavors: [] },
      gourmet: { quantity: 0, flavors: [] }
    },
  })

  const whatsappNumber = "5547999484461"

  const steps = [
    'Informações Importantes',
    'Tamanho do Bolo',
    'Massa do Bolo', 
    'Recheios',
    'Decoração',
    'Brigadeiros',
    'Resumo'
  ]

  const sizes = [
    { id: 'P', name: 'Tamanho P', diameter: '15 cm', serves: '12 a 15 fatias', weight: 'Até 1,6kg' },
    { id: 'M', name: 'Tamanho M', diameter: '20 cm', serves: '22 a 25 fatias', weight: 'Até 2,7kg' },
    { id: 'G', name: 'Tamanho G', diameter: '22 cm', serves: '25 a 30 fatias', weight: 'Até 3,5kg' },
    { id: 'GG', name: 'Tamanho GG', diameter: '25 cm', serves: 'Até 35 fatias', weight: 'Até 4,2kg' }
  ]

  const masses = ['Baunilha', 'Chocolate']

  const traditionalFillings = [
    'Brigadeiro 50% cacau',
    'Dois Amores (brigadeiro + branco)',
    'Quatro leites (condensado, creme de leite, leite em pó e leite de coco)',
    'Brigadeiro de maracujá (feito com a fruta)',
    'Creme de Ninho',
    'Prestígio (brigadeiro de coco com flocos)',
    'Doce de leite caseiro'
  ]

  const specialFillings = [
    'Brigadeiro com morangos',
    'Quatro leites com morango',
    'Quatro leites com abacaxi', 
    'Quatro leites com uva verde',
    'Creme de Ninho com morango',
    'Creme de Ninho com abacaxi',
    'Creme de Ninho com uva verde',
    'Creme de Ninho com manga',
    'Creme de Ninho com pêssego',
    'Nata com morango e suspiros',
    'Doce de leite com abacaxi e coco'
  ]

  const decorationExtras = [
    { name: 'Topo de bolo', price: 'A partir de R$ 25,00' },
    { name: 'Prato MDF', price: 'R$ 5,00' },
    { name: 'Caixa de transporte', price: 'R$ 10,00' }
  ]

  const traditionalBrigadeiroFlavors = [
    'Brigadeiro', 'Beijinho', 'Dois Amores', 'Nesquik', 'Amendoim',
    'Chuva', 'Crocante de amendoim', 'Coco queimado', 'Ninho'
  ]

  const gourmetBrigadeiroFlavors = [
    'Ninho com Nutella', 'Tipo Ferrero', 'Surpresa de Uva', 'Sensação de Nutella'
  ]



  const handleSizeSelect = (size) => {
    const newSize = orderData.size === size ? null : size
    setOrderData(prev => ({ ...prev, size: newSize }))
  }

  const handleMassSelect = (mass) => {
    const newMass = orderData.mass === mass ? null : mass
    setOrderData(prev => ({ ...prev, mass: newMass }))
  }

  const handleFillingToggle = (filling, type) => {
    setOrderData(prev => {
      const isSelected = prev.fillings.some(f => f.name === filling)
      let newFillings
      if (isSelected) {
        newFillings = prev.fillings.filter(f => f.name !== filling)
      } else {
        newFillings = [...prev.fillings, { name: filling, type, price: type === 'traditional' ? 70 : 80 }]
      }
      return { ...prev, fillings: newFillings }
    })
  }

  const handleDecorationExtraToggle = (extra) => {
    setOrderData(prev => {
      const extras = prev.decoration.extras.includes(extra)
        ? prev.decoration.extras.filter(e => e !== extra)
        : [...prev.decoration.extras, extra]
      return {
        ...prev,
        decoration: { ...prev.decoration, extras }
      }
    })
  }

  const handleBrigadeiroQuantityChange = (type, quantity) => {
    setOrderData(prev => ({
      ...prev,
      brigadeiros: {
        ...prev.brigadeiros,
        [type]: { ...prev.brigadeiros[type], quantity }
      }
    }))
  }

  const handleBrigadeiroFlavorToggle = (type, flavor) => {
    setOrderData(prev => {
      const currentFlavors = prev.brigadeiros[type].flavors
      const maxFlavors = prev.brigadeiros[type].quantity === 50 ? 2 : 4
      
      if (currentFlavors.includes(flavor)) {
        return {
          ...prev,
          brigadeiros: {
            ...prev.brigadeiros,
            [type]: {
              ...prev.brigadeiros[type],
              flavors: currentFlavors.filter(f => f !== flavor)
            }
          }
        }
      } else if (currentFlavors.length < maxFlavors) {
        return {
          ...prev,
          brigadeiros: {
            ...prev.brigadeiros,
            [type]: {
              ...prev.brigadeiros[type],
              flavors: [...currentFlavors, flavor]
            }
          }
        }
      }
      return prev
    })
  }



  const generateWhatsAppMessage = () => {
    let message = "🎂 *PEDIDO PERSONALIZADO - DOCE MEMÓRIA*\n\n"
    let total = 0
    
    if (orderData.size) {
      const size = sizes.find(s => s.id === orderData.size)
      message += `📏 *Tamanho:* ${size.name} (${size.diameter})\n`
      message += `👥 *Rendimento:* ${size.serves}\n`
      message += `⚖️ *Peso:* ${size.weight}\n\n`
    }

    if (orderData.mass) {
      message += `🍰 *Massa:* ${orderData.mass}\n\n`
    }

    if (orderData.fillings.length > 0) {
      message += `🎂 *Recheios:*\n`
      orderData.fillings.forEach(filling => {
        message += `• ${filling.name} (R$ ${filling.price}/kg)\n`
        // Assumindo peso médio do bolo para cálculo
        const size = sizes.find(s => s.id === orderData.size)
        if (size) {
          const weight = parseFloat(size.weight.replace('kg', ''))
          total += parseFloat(filling.price) * weight
        }
      })
      message += `\n`
    }

    if (orderData.decoration.extras.length > 0) {
      message += `🎨 *Decoração Extra:*\n`
      orderData.decoration.extras.forEach(extra => {
        const decoration = decorationExtras.find(d => d.name === extra)
        message += `• ${decoration.name} - ${decoration.price}\n`
        // Extrair valor numérico do preço
        const priceMatch = decoration.price.match(/R\$\s*(\d+(?:,\d+)?)/);
        if (priceMatch) {
          total += parseFloat(priceMatch[1].replace(',', '.'))
        }
      })
      message += `\n`
    }

    if (orderData.brigadeiros.wanted) {
      if (orderData.brigadeiros.traditional.quantity > 0) {
        const price = orderData.brigadeiros.traditional.quantity === 100 ? 150 : 80
        message += `🍡 *Brigadeiros Tradicionais:*\n`
        message += `• Quantidade: ${orderData.brigadeiros.traditional.quantity} unidades\n`
        message += `• Sabores: ${orderData.brigadeiros.traditional.flavors.join(', ')}\n`
        message += `• Valor: R$ ${price.toFixed(2).replace('.', ',')}\n\n`
        total += price
      }

      if (orderData.brigadeiros.gourmet.quantity > 0) {
        const price = orderData.brigadeiros.gourmet.quantity === 100 ? 185 : 95
        message += `🍡 *Brigadeiros Gourmet:*\n`
        message += `• Quantidade: ${orderData.brigadeiros.gourmet.quantity} unidades\n`
        message += `• Sabores: ${orderData.brigadeiros.gourmet.flavors.join(', ')}\n`
        message += `• Valor: R$ ${price.toFixed(2).replace('.', ',')}\n\n`
        total += price
      }
    }



    // Adicionar total do pedido
    if (total > 0) {
      message += `💰 *TOTAL DO PEDIDO: R$ ${total.toFixed(2).replace('.', ',')}*\n\n`
    }

    message += `📞 Gostaria de confirmar este pedido e receber mais informações sobre prazos e formas de pagamento.`

    return message
  }

  const handleSendWhatsApp = () => {
    const message = generateWhatsAppMessage()
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    // Garantir que o redirecionamento funcione corretamente
    if (window.innerWidth <= 768) {
      // Em dispositivos móveis, usar window.location para melhor compatibilidade
      window.location.href = url
    } else {
      // Em desktop, abrir em nova aba
      window.open(url, '_blank')
    }
    // Fechar o formulário após enviar
    onClose()
  }

  const handlePayNow = () => {
    const message = generateWhatsAppMessage()
    const pixMessage = `${message}\n\n💳 *PAGAMENTO VIA PIX*\n\nChave PIX: 47999484461\nNome: Vitória Souza\n\n✅ Após efetuar o pagamento, envie o comprovante por este WhatsApp para confirmar seu pedido.`
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(pixMessage)}`
    // Garantir que o redirecionamento funcione corretamente
    if (window.innerWidth <= 768) {
      // Em dispositivos móveis, usar window.location para melhor compatibilidade
      window.location.href = url
    } else {
      // Em desktop, abrir em nova aba
      window.open(url, '_blank')
    }
    // Fechar o formulário após enviar
    onClose()
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1: return orderData.size !== null
      case 2: return orderData.mass !== null
      case 3: return orderData.fillings.length > 0
      case 4: return true
      case 5: return true
      case 6: return true
      default: return true
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b" style={{borderColor: '#f0e6f7'}}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold" style={{color: '#8b4513'}}>
              Pedido Personalizado
            </h2>
            <Button 
              variant="outline" 
              onClick={onClose}
              className="rounded-full w-8 h-8 p-0"
            >
              ×
            </Button>
          </div>
          
          {/* Progress Bar */}
          <div className="flex items-center space-x-2 mb-4">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    index <= currentStep 
                      ? 'text-white' 
                      : 'bg-gray-200 text-gray-500'
                  }`}
                  style={{
                    backgroundColor: index <= currentStep ? '#d4a574' : undefined
                  }}
                >
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div 
                    className={`w-8 h-1 mx-1 ${
                      index < currentStep ? '' : 'bg-gray-200'
                    }`}
                    style={{
                      backgroundColor: index < currentStep ? '#d4a574' : undefined
                    }}
                  />
                )}
              </div>
            ))}
          </div>
          
          <p className="text-sm text-gray-600">{steps[currentStep]}</p>
        </div>

        <div className="p-6">
          {/* Step 0: Important Information */}
          {currentStep === 0 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <AlertTriangle className="w-12 h-12 mx-auto mb-4" style={{color: '#d4a574'}} />
                <h3 className="text-xl font-bold mb-2" style={{color: '#8b4513'}}>
                  Informações Importantes
                </h3>
                <p className="text-gray-600">Leia atentamente antes de fazer seu pedido</p>
              </div>

              <div className="grid gap-4">
                <Card className="border-2" style={{borderColor: '#f0e6f7'}}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <Clock className="w-5 h-5 mt-1" style={{color: '#d4a574'}} />
                      <div>
                        <p className="font-medium" style={{color: '#8b4513'}}>Prazos de Antecedência</p>
                        <p className="text-sm text-gray-600">• Pedidos normais: mínimo 4 dias</p>
                        <p className="text-sm text-gray-600">• Pedidos com topo de bolo: mínimo 10 dias</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2" style={{borderColor: '#f0e6f7'}}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <CreditCard className="w-5 h-5 mt-1" style={{color: '#d4a574'}} />
                      <div>
                        <p className="font-medium" style={{color: '#8b4513'}}>Pagamento e Confirmação</p>
                        <p className="text-sm text-gray-600">• Sinal de 30% via PIX para confirmar</p>
                        <p className="text-sm text-gray-600">• Formas: Dinheiro, PIX, Cartão (com taxa)</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2" style={{borderColor: '#f0e6f7'}}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 mt-1" style={{color: '#d4a574'}} />
                      <div>
                        <p className="font-medium" style={{color: '#8b4513'}}>Entrega</p>
                        <p className="text-sm text-gray-600">• Entregamos em toda a região de Itapoá</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-red-200 bg-red-50">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="w-5 h-5 mt-1 text-red-500" />
                      <div>
                        <p className="font-medium text-red-700">Política de Cancelamento</p>
                        <p className="text-sm text-red-600">Cancelamentos com menos de 48h: valor da entrada não será devolvido</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Step 1: Size Selection */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <Cake className="w-12 h-12 mx-auto mb-4" style={{color: '#d4a574'}} />
                <h3 className="text-xl font-bold mb-2" style={{color: '#8b4513'}}>
                  Escolha o Tamanho do Bolo
                </h3>
                <p className="text-gray-600">Selecione o tamanho ideal para sua ocasião</p>
                
                {/* Imagem de referência */}
                <div className="mt-4">
                  <img 
                    src={boloTopoImg} 
                    alt="Exemplo de bolo confeitado com topo" 
                    className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-yellow-200 shadow-lg"
                  />
                  <p className="text-xs text-gray-500 mt-2">Exemplo: Bolo confeitado com topo</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sizes.map((size) => (
                  <Card 
                    key={size.id}
                    className={`cursor-pointer transition-all border-2 ${
                      orderData.size === size.id 
                        ? 'ring-2 ring-offset-2' 
                        : 'hover:shadow-lg'
                    }`}
                    style={{
                      borderColor: orderData.size === size.id ? '#d4a574' : '#f0e6f7',
                      ringColor: orderData.size === size.id ? '#d4a574' : undefined
                    }}
                    onClick={() => handleSizeSelect(size.id)}
                  >
                    <CardContent className="p-4">
                      <div className="text-center">
                        <h4 className="font-bold text-lg mb-2" style={{color: '#8b4513'}}>
                          {size.name}
                        </h4>
                        <p className="text-sm text-gray-600 mb-1">📏 {size.diameter}</p>
                        <p className="text-sm text-gray-600 mb-1">👥 {size.serves}</p>
                        <p className="text-sm text-gray-600">⚖️ {size.weight}</p>
                        {orderData.size === size.id && (
                          <CheckCircle className="w-6 h-6 mx-auto mt-2" style={{color: '#d4a574'}} />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                <p className="text-sm text-yellow-800">
                  <strong>Observações:</strong> O peso pode variar conforme o sabor escolhido. 
                  O número de fatias pode variar de acordo com a espessura dos cortes.
                </p>
              </div>
            </div>
          )}

          {/* Step 2: Mass Selection */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2" style={{color: '#8b4513'}}>
                  Escolha a Massa do Bolo
                </h3>
                <p className="text-gray-600">Selecione o sabor da massa</p>
                
                {/* Imagem de referência */}
                <div className="mt-4">
                  <img 
                    src={boloUnicornioImg} 
                    alt="Exemplo de bolo confeitado unicórnio" 
                    className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-pink-200 shadow-lg"
                  />
                  <p className="text-xs text-gray-500 mt-2">Exemplo: Bolo confeitado temático</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
                {masses.map((mass) => (
                  <Card 
                    key={mass}
                    className={`cursor-pointer transition-all border-2 ${
                      orderData.mass === mass 
                        ? 'ring-2 ring-offset-2' 
                        : 'hover:shadow-lg'
                    }`}
                    style={{
                      borderColor: orderData.mass === mass ? '#d4a574' : '#f0e6f7',
                      ringColor: orderData.mass === mass ? '#d4a574' : undefined
                    }}
                    onClick={() => handleMassSelect(mass)}
                  >
                    <CardContent className="p-6">
                      <div className="text-center">
                        <h4 className="font-bold text-lg" style={{color: '#8b4513'}}>
                          {mass}
                        </h4>
                        {orderData.mass === mass && (
                          <CheckCircle className="w-6 h-6 mx-auto mt-2" style={{color: '#d4a574'}} />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Fillings Selection */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2" style={{color: '#8b4513'}}>
                  Escolha os Recheios
                </h3>
                <p className="text-gray-600">Selecione um ou mais recheios para seu bolo</p>
                
                {/* Imagem de referência */}
                <div className="mt-4">
                  <img 
                    src={boloSimplesImg} 
                    alt="Exemplo de bolo confeitado simples" 
                    className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-green-200 shadow-lg"
                  />
                  <p className="text-xs text-gray-500 mt-2">Exemplo: Bolo confeitado simples</p>
                </div>
              </div>

              {/* Traditional Fillings */}
              <div>
                <h4 className="text-lg font-semibold mb-3 flex items-center" style={{color: '#8b4513'}}>
                  <Badge className="mr-2" style={{backgroundColor: '#d4a574'}}>R$ 70,00/kg</Badge>
                  Recheios Tradicionais
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {traditionalFillings.map((filling) => (
                    <Card 
                      key={filling}
                      className={`cursor-pointer transition-all border ${
                        orderData.fillings.some(f => f.name === filling)
                          ? 'ring-2 ring-offset-1' 
                          : 'hover:shadow-md'
                      }`}
                      style={{
                        borderColor: orderData.fillings.some(f => f.name === filling) ? '#d4a574' : '#f0e6f7',
                        ringColor: orderData.fillings.some(f => f.name === filling) ? '#d4a574' : undefined
                      }}
                      onClick={() => handleFillingToggle(filling, 'traditional')}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">{filling}</span>
                          {orderData.fillings.some(f => f.name === filling) && (
                            <CheckCircle className="w-4 h-4" style={{color: '#d4a574'}} />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Special Fillings */}
              <div>
                <h4 className="text-lg font-semibold mb-3 flex items-center" style={{color: '#8b4513'}}>
                  <Badge className="mr-2" style={{backgroundColor: '#e8b4cb'}}>R$ 80,00/kg</Badge>
                  Recheios Especiais
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {specialFillings.map((filling) => (
                    <Card 
                      key={filling}
                      className={`cursor-pointer transition-all border ${
                        orderData.fillings.some(f => f.name === filling)
                          ? 'ring-2 ring-offset-1' 
                          : 'hover:shadow-md'
                      }`}
                      style={{
                        borderColor: orderData.fillings.some(f => f.name === filling) ? '#e8b4cb' : '#f0e6f7',
                        ringColor: orderData.fillings.some(f => f.name === filling) ? '#e8b4cb' : undefined
                      }}
                      onClick={() => handleFillingToggle(filling, 'special')}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">{filling}</span>
                          {orderData.fillings.some(f => f.name === filling) && (
                            <CheckCircle className="w-4 h-4" style={{color: '#e8b4cb'}} />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Decoration */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2" style={{color: '#8b4513'}}>
                  Decoração do Bolo
                </h3>
                <p className="text-gray-600">Personalize a decoração do seu bolo</p>
              </div>

              <Card className="border-2" style={{borderColor: '#f0e6f7'}}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center" style={{color: '#8b4513'}}>
                    <CheckCircle className="w-5 h-5 mr-2" style={{color: '#d4a574'}} />
                    Decorações Inclusas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <div className="text-center p-2 bg-green-50 rounded">
                      <span className="text-sm text-green-700">✓ Chantininho</span>
                    </div>
                    <div className="text-center p-2 bg-green-50 rounded">
                      <span className="text-sm text-green-700">✓ Pérolas</span>
                    </div>
                    <div className="text-center p-2 bg-green-50 rounded">
                      <span className="text-sm text-green-700">✓ Detalhes dourados</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div>
                <h4 className="text-lg font-semibold mb-3" style={{color: '#8b4513'}}>
                  Adicionais Opcionais
                </h4>
                <div className="space-y-3">
                  {decorationExtras.map((extra) => (
                    <Card 
                      key={extra.name}
                      className={`cursor-pointer transition-all border ${
                        orderData.decoration.extras.includes(extra.name)
                          ? 'ring-2 ring-offset-1' 
                          : 'hover:shadow-md'
                      }`}
                      style={{
                        borderColor: orderData.decoration.extras.includes(extra.name) ? '#d4a574' : '#f0e6f7',
                        ringColor: orderData.decoration.extras.includes(extra.name) ? '#d4a574' : undefined
                      }}
                      onClick={() => handleDecorationExtraToggle(extra.name)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-medium">{extra.name}</span>
                            <p className="text-sm text-gray-600">{extra.price}</p>
                          </div>
                          {orderData.decoration.extras.includes(extra.name) && (
                            <CheckCircle className="w-5 h-5" style={{color: '#d4a574'}} />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Brigadeiros */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2" style={{color: '#8b4513'}}>
                  Deseja incluir Brigadeiros?
                </h3>
                <p className="text-gray-600">Adicione brigadeiros ao seu pedido</p>
                
                {/* Galeria de imagens de referência */}
                <div className="mt-6">
                  <p className="text-sm text-gray-600 mb-4">Exemplos dos nossos brigadeiros:</p>
                  <div className="flex justify-center space-x-4">
                    <div className="text-center">
                      <img 
                        src={brigadeiroNesquikImg} 
                        alt="Brigadeiro Gourmet Nesquik" 
                        className="w-32 h-32 rounded-full object-cover border-4 border-pink-200 shadow-lg"
                      />
                      <p className="text-sm text-gray-600 mt-2 font-medium">Gourmet Nesquik</p>
                    </div>
                    <div className="text-center">
                      <img 
                        src={brigadeiroNinhoChurrosImg} 
                        alt="Brigadeiro Gourmet Ninho e Churros" 
                        className="w-32 h-32 rounded-full object-cover border-4 border-yellow-200 shadow-lg"
                      />
                      <p className="text-sm text-gray-600 mt-2 font-medium">Gourmet Ninho/Churros</p>
                    </div>
                    <div className="text-center">
                      <img 
                        src={brigadeiroDoisAmoresImg} 
                        alt="Brigadeiro Tradicional Dois Amores" 
                        className="w-32 h-32 rounded-full object-cover border-4 border-purple-200 shadow-lg"
                      />
                      <p className="text-sm text-gray-600 mt-2 font-medium">Tradicional Dois Amores</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center space-x-4 mb-6">
                <Button
                  variant={orderData.brigadeiros.wanted ? "default" : "outline"}
                  onClick={() => setOrderData(prev => ({ 
                    ...prev, 
                    brigadeiros: { ...prev.brigadeiros, wanted: true }
                  }))}
                  className="px-8"
                  style={{
                    backgroundColor: orderData.brigadeiros.wanted ? '#d4a574' : 'transparent',
                    borderColor: '#d4a574',
                    color: orderData.brigadeiros.wanted ? 'white' : '#d4a574'
                  }}
                >
                  Sim, quero brigadeiros
                </Button>
                <Button
                  variant={!orderData.brigadeiros.wanted ? "default" : "outline"}
                  onClick={() => setOrderData(prev => ({ 
                    ...prev, 
                    brigadeiros: { ...prev.brigadeiros, wanted: false }
                  }))}
                  className="px-8"
                  style={{
                    backgroundColor: !orderData.brigadeiros.wanted ? '#8b4513' : 'transparent',
                    borderColor: '#8b4513',
                    color: !orderData.brigadeiros.wanted ? 'white' : '#8b4513'
                  }}
                >
                  Não, obrigado
                </Button>
              </div>

              {orderData.brigadeiros.wanted && (
                <div className="space-y-6">
                  {/* Traditional Brigadeiros */}
                  <Card className="border-2" style={{borderColor: '#f0e6f7'}}>
                    <CardHeader>
                      <CardTitle className="flex flex-col space-y-2">
                        <div className="flex items-center">
                          <img src={brigadeiroTradicionalImg} alt="Brigadeiro Tradicional" className="w-12 h-12 mr-3 rounded-full object-cover" />
                          <span style={{color: '#8b4513'}}>Brigadeiros Tradicionais</span>
                        </div>
                        <div className="ml-15">
                          <Badge style={{backgroundColor: '#d4a574'}}>R$ 150,00 o cento | R$ 80,00 meio cento</Badge>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Quantidade:</p>
                        <div className="flex space-x-2">
                          <Button
                            variant={orderData.brigadeiros.traditional.quantity === 50 ? "default" : "outline"}
                            onClick={() => handleBrigadeiroQuantityChange('traditional', 50)}
                            style={{
                              backgroundColor: orderData.brigadeiros.traditional.quantity === 50 ? '#d4a574' : 'transparent',
                              borderColor: '#d4a574'
                            }}
                          >
                            Meio cento (50)
                          </Button>
                          <Button
                            variant={orderData.brigadeiros.traditional.quantity === 100 ? "default" : "outline"}
                            onClick={() => handleBrigadeiroQuantityChange('traditional', 100)}
                            style={{
                              backgroundColor: orderData.brigadeiros.traditional.quantity === 100 ? '#d4a574' : 'transparent',
                              borderColor: '#d4a574'
                            }}
                          >
                            Cento (100)
                          </Button>
                        </div>
                      </div>

                      {orderData.brigadeiros.traditional.quantity > 0 && (
                        <div>
                          <p className="text-sm text-gray-600 mb-2">
                            Sabores ({orderData.brigadeiros.traditional.flavors.length}/{orderData.brigadeiros.traditional.quantity === 50 ? 2 : 4}):
                          </p>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {traditionalBrigadeiroFlavors.map((flavor) => (
                              <Button
                                key={flavor}
                                variant={orderData.brigadeiros.traditional.flavors.includes(flavor) ? "default" : "outline"}
                                size="sm"
                                onClick={() => handleBrigadeiroFlavorToggle('traditional', flavor)}
                                className="text-xs"
                                style={{
                                  backgroundColor: orderData.brigadeiros.traditional.flavors.includes(flavor) ? '#d4a574' : 'transparent',
                                  borderColor: '#d4a574'
                                }}
                              >
                                {flavor}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Gourmet Brigadeiros */}
                  <Card className="border-2" style={{borderColor: '#f0e6f7'}}>
                    <CardHeader>
                      <CardTitle className="flex flex-col space-y-2">
                        <div className="flex items-center">
                          <img src={brigadeiroGourmetImg} alt="Brigadeiro Gourmet" className="w-12 h-12 mr-3 rounded-full object-cover" />
                          <span style={{color: '#8b4513'}}>Brigadeiros Gourmet</span>
                        </div>
                        <div className="ml-15">
                          <Badge style={{backgroundColor: '#e8b4cb'}}>R$ 185,00 o cento | R$ 95,00 meio cento</Badge>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Quantidade:</p>
                        <div className="flex space-x-2">
                          <Button
                            variant={orderData.brigadeiros.gourmet.quantity === 50 ? "default" : "outline"}
                            onClick={() => handleBrigadeiroQuantityChange('gourmet', 50)}
                            style={{
                              backgroundColor: orderData.brigadeiros.gourmet.quantity === 50 ? '#e8b4cb' : 'transparent',
                              borderColor: '#e8b4cb'
                            }}
                          >
                            Meio cento (50)
                          </Button>
                          <Button
                            variant={orderData.brigadeiros.gourmet.quantity === 100 ? "default" : "outline"}
                            onClick={() => handleBrigadeiroQuantityChange('gourmet', 100)}
                            style={{
                              backgroundColor: orderData.brigadeiros.gourmet.quantity === 100 ? '#e8b4cb' : 'transparent',
                              borderColor: '#e8b4cb'
                            }}
                          >
                            Cento (100)
                          </Button>
                        </div>
                      </div>

                      {orderData.brigadeiros.gourmet.quantity > 0 && (
                        <div>
                          <p className="text-sm text-gray-600 mb-2">
                            Sabores ({orderData.brigadeiros.gourmet.flavors.length}/{orderData.brigadeiros.gourmet.quantity === 50 ? 2 : 4}):
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {gourmetBrigadeiroFlavors.map((flavor) => (
                              <Button
                                key={flavor}
                                variant={orderData.brigadeiros.gourmet.flavors.includes(flavor) ? "default" : "outline"}
                                size="sm"
                                onClick={() => handleBrigadeiroFlavorToggle('gourmet', flavor)}
                                className="text-xs"
                                style={{
                                  backgroundColor: orderData.brigadeiros.gourmet.flavors.includes(flavor) ? '#e8b4cb' : 'transparent',
                                  borderColor: '#e8b4cb'
                                }}
                              >
                                {flavor}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          )}

          {/* Step 6: Doces Finos */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <Gift className="w-12 h-12 mx-auto mb-4" style={{color: '#d4a574'}} />
                <h3 className="text-xl font-bold mb-2" style={{color: '#8b4513'}}>
                  Doces Finos para Presente
                </h3>
                <p className="text-gray-600">Adicione doces especiais para presentear</p>
              </div>

              <div className="flex justify-center space-x-4 mb-6">
                <Button
                  variant={orderData.docesFinos.wanted ? "default" : "outline"}
                  onClick={() => setOrderData(prev => ({ 
                    ...prev, 
                    docesFinos: { ...prev.docesFinos, wanted: true }
                  }))}
                  className="px-8"
                  style={{
                    backgroundColor: orderData.docesFinos.wanted ? '#d4a574' : 'transparent',
                    borderColor: '#d4a574',
                    color: orderData.docesFinos.wanted ? 'white' : '#d4a574'
                  }}
                >
                  Sim, quero doces finos
                </Button>
                <Button
                  variant={!orderData.docesFinos.wanted ? "default" : "outline"}
                  onClick={() => setOrderData(prev => ({ 
                    ...prev, 
                    docesFinos: { ...prev.docesFinos, wanted: false }
                  }))}
                  className="px-8"
                  style={{
                    backgroundColor: !orderData.docesFinos.wanted ? '#8b4513' : 'transparent',
                    borderColor: '#8b4513',
                    color: !orderData.docesFinos.wanted ? 'white' : '#8b4513'
                  }}
                >
                  Não, obrigado
                </Button>
              </div>

              {orderData.docesFinos.wanted && (
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800">
                      <strong>Importante:</strong> Pedido mínimo de 10 unidades por sabor/tipo
                    </p>
                  </div>

                  {docesFinos.map((doce) => (
                    <Card key={doce.id} className="border-2" style={{borderColor: '#f0e6f7'}}>
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span style={{color: '#8b4513'}}>{doce.name}</span>
                          <Badge style={{backgroundColor: '#d4a574'}}>
                            R$ {doce.price.toFixed(2)} cada
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {doce.flavors.map((flavor) => {
                            const currentQuantity = orderData.docesFinos.items.find(
                              item => item.id === doce.id && item.flavor === flavor
                            )?.quantity || 0

                            return (
                              <div key={flavor} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                                <span className="text-sm font-medium">{flavor}</span>
                                <div className="flex items-center space-x-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleDoceFinoQuantityChange(doce.id, flavor, Math.max(0, currentQuantity - 10))}
                                    disabled={currentQuantity === 0}
                                    className="w-8 h-8 p-0"
                                  >
                                    <Minus className="w-4 h-4" />
                                  </Button>
                                  <span className="w-12 text-center text-sm font-medium">
                                    {currentQuantity}
                                  </span>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleDoceFinoQuantityChange(doce.id, flavor, currentQuantity + 10)}
                                    className="w-8 h-8 p-0"
                                  >
                                    <Plus className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step 7: Summary */}
          {currentStep === 7 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <ShoppingCart className="w-12 h-12 mx-auto mb-4" style={{color: '#d4a574'}} />
                <h3 className="text-xl font-bold mb-2" style={{color: '#8b4513'}}>
                  Resumo do Pedido
                </h3>
                <p className="text-gray-600">Confira todos os detalhes antes de enviar</p>
              </div>

              <div className="space-y-4">
                {/* Bolo */}
                <Card className="border-2" style={{borderColor: '#f0e6f7'}}>
                  <CardHeader>
                    <CardTitle style={{color: '#8b4513'}}>🎂 Bolo Personalizado</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {orderData.size && (
                      <p><strong>Tamanho:</strong> {sizes.find(s => s.id === orderData.size)?.name}</p>
                    )}
                    {orderData.mass && (
                      <p><strong>Massa:</strong> {orderData.mass}</p>
                    )}
                    {orderData.fillings.length > 0 && (
                      <div>
                        <strong>Recheios:</strong>
                        <ul className="list-disc list-inside ml-4">
                          {orderData.fillings.map((filling, index) => (
                            <li key={index} className="text-sm">
                              {filling.name} (R$ {filling.price}/kg)
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {orderData.decoration.extras.length > 0 && (
                      <div>
                        <strong>Decoração Extra:</strong>
                        <ul className="list-disc list-inside ml-4">
                          {orderData.decoration.extras.map((extra, index) => (
                            <li key={index} className="text-sm">{extra}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Brigadeiros */}
                {orderData.brigadeiros.wanted && (
                  <Card className="border-2" style={{borderColor: '#f0e6f7'}}>
                    <CardHeader>
                      <CardTitle style={{color: '#8b4513'}}>🍡 Brigadeiros</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {orderData.brigadeiros.traditional.quantity > 0 && (
                        <div>
                          <p><strong>Tradicionais:</strong> {orderData.brigadeiros.traditional.quantity} unidades</p>
                          <p className="text-sm">Sabores: {orderData.brigadeiros.traditional.flavors.join(', ')}</p>
                        </div>
                      )}
                      {orderData.brigadeiros.gourmet.quantity > 0 && (
                        <div>
                          <p><strong>Gourmet:</strong> {orderData.brigadeiros.gourmet.quantity} unidades</p>
                          <p className="text-sm">Sabores: {orderData.brigadeiros.gourmet.flavors.join(', ')}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* Doces Finos */}
                {orderData.docesFinos.wanted && orderData.docesFinos.items.length > 0 && (
                  <Card className="border-2" style={{borderColor: '#f0e6f7'}}>
                    <CardHeader>
                      <CardTitle style={{color: '#8b4513'}}>🎁 Doces Finos</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {orderData.docesFinos.items.map((item, index) => {
                        const doce = docesFinos.find(d => d.id === item.id)
                        return (
                          <div key={index}>
                            <p><strong>{doce?.name}:</strong> {item.flavor}</p>
                            <p className="text-sm">Quantidade: {item.quantity} unidades</p>
                          </div>
                        )
                      })}
                    </CardContent>
                  </Card>
                )}
              </div>

              <div className="text-center pt-4 space-y-4">
                <Button
                  onClick={handleSendWhatsApp}
                  className="px-8 py-3 text-lg font-medium w-full"
                  style={{backgroundColor: '#d4a574'}}
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Enviar Pedido via WhatsApp
                </Button>
                
                <div className="flex items-center space-x-4">
                  <div className="flex-1 h-px bg-gray-300"></div>
                  <span className="text-gray-500 text-sm">ou</span>
                  <div className="flex-1 h-px bg-gray-300"></div>
                </div>
                
                <Button
                  onClick={handlePayNow}
                  className="px-8 py-3 text-lg font-medium w-full"
                  style={{backgroundColor: '#e8b4cb'}}
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  Pagar Agora via PIX
                </Button>
                
                <p className="text-xs text-gray-500 mt-2">
                  PIX: 47999484461 - Vitória Souza
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between p-6 border-t" style={{borderColor: '#f0e6f7'}}>
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
            style={{borderColor: '#d4a574', color: '#8b4513'}}
          >
            Anterior
          </Button>
          
          {currentStep < steps.length - 1 ? (
            <Button
              onClick={nextStep}
              disabled={!canProceed()}
              style={{backgroundColor: '#d4a574'}}
            >
              Próximo
            </Button>
          ) : (
            <Button
              onClick={handleSendWhatsApp}
              style={{backgroundColor: '#d4a574'}}
            >
              Finalizar Pedido
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default CakeOrderForm

