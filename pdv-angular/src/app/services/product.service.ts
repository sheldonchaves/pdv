import { Injectable, signal } from '@angular/core';
import { Product, Category } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: '1',
      name: 'Sofá Seccional de Couro',
      sku: 'LV-9021',
      description: 'Sofá seccional em couro legítimo, perfeito para compor sua sala de estar com elegância e sofisticação. Possui estrutura em madeira maciça, assentos confortáveis com espuma de alta densidade e acabamento impecável. Ideal para ambientes espaçosos, oferece conforto superior e durabilidade garantida.',
      price: 1299.99,
      originalPrice: 1599.99,
      brand: 'Millena',
      images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuC0Kij9n43d3D4jGRcw-QvpUarDFZn1cZx0oFW029IqyOuJt5sXy9_pGeqRZVR_vMxmTehpTZQgyVwxDiCMQQCg0CgEuEBtAbLB4MlCzfKFphiJ_xm5aexYdV-BJup448vot0Tc5Bwu_U4OMQVps5Zk_C1AUr1R9rKIpy8rzQpD7qc5iSn-J2pjvbNnZxRsND1UX7GbN_8yCITMI_Tc8Aa8aSnXNpBigixwfMS1auWpFe5EoTChqZ5ouK6zpiMt6EHtMdoHDJaJYS4'],
      category: 'moveis',
      stock: 12,
      specifications: {
        material: 'Couro Legítimo / Madeira Maciça',
        dimensions: '2,50m (L) x 1,80m (P) x 0,85m (A)',
        warranty: '24 meses',
        color: 'Marrom'
      }
    },
    {
      id: '2',
      name: 'Mesa de Jantar Moderna',
      sku: 'DT-4410',
      description: 'Mesa de jantar moderna e espaçosa, perfeita para reuniões familiares e jantares elegantes. Fabricada em MDF com acabamento em laminado de alta qualidade, oferece resistência a manchas e facilidade de limpeza. Design minimalista que se adapta a diversos estilos de decoração.',
      price: 599.00,
      brand: 'Millena',
      images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuC3Wl0htksuq4E0MhpC715MKKYhdfIFsG2p_LYSlD54fYvnNiuBQQc0kNb-WQ_FT6NyC0U6I5cr7GyHWKfco_WBz7EDvMyNjuFuQ21qQvee5GEc1fMwGputTU9fis_erUpfeyI41nWaeZzfiLr4wuHSL4-pqMx2urlcxfyI-9zGW8ICNEQ8yQsn7gBVPeWrN7fLWCgEwqcDQusLcL5ijOptPV0qX2ytLsYm2VmoXH4VYaCGxT6MlgeUSo47IBHRkpcvrNmvvEBBma4'],
      category: 'moveis',
      stock: 3,
      specifications: {
        material: 'MDF com Laminado',
        dimensions: '1,40m (L) x 0,80m (P) x 0,75m (A)',
        warranty: '12 meses',
        color: 'Branco/Nogueira'
      }
    },
    {
      id: '3',
      name: 'Cadeira ErgoPro',
      sku: 'CH-5521',
      description: 'Cadeira ergonômica para escritório desenvolvida para proporcionar máximo conforto durante longas jornadas de trabalho. Possui regulagem de altura, apoio lombar ajustável, braços reguláveis e encosto reclinável. Ideal para quem trabalha sentado por muitas horas.',
      price: 245.00,
      brand: 'ErgoMax',
      images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuAPeoR7NlslHiMjBR24Xq5khOWfCyPrZkD0sry5GN8grv7fKB5u7B7hUsTKpUEcJCuykqw6jx8D4RSgAE6tK2tRPuDGTtu2JgLF-lRuN56yrSkM7qnWaCGTjMaxmmvvxUqFCk3k1TX8FIMTRbMET6t-gwRe6B-k8pl_LjuX6O6nX4NfAgQfhfWAJnVpbbecDOdt-PXDNKGjiCKP7OOLPWx8qE-aAjDq5bmHc0FEGYpNnwU1vk1mZ53djudcjo0-0OhbccDxmAV_OEM'],
      category: 'moveis',
      stock: 0,
      specifications: {
        material: 'Tecido Mesh / Estrutura de Aço',
        dimensions: '0,65m (L) x 0,65m (P) x 1,10-1,25m (A)',
        warranty: '12 meses',
        color: 'Preto/Cinza'
      }
    },
    {
      id: '4',
      name: 'Cama King Size Madeira',
      sku: 'BD-7788',
      description: 'Cama king size em madeira maciça de eucalipto, oferecendo robustez e durabilidade excepcionais. Design clássico e elegante, perfeita para criar um ambiente aconchegante no seu quarto. A estrutura reforçada suporta colchões de até 200kg, garantindo estabilidade e conforto.',
      price: 849.00,
      brand: 'Millena',
      images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuAxnDoATvRVvnBidbnPIwEqcM3kkbP1xZcmxZF7H8puRztdVCNX_vFH-VLJE1xKQHfqaRapukKBCupPM7dWj2NQmEtJwbHOj5Sg8fxQnESi3tbu37MXcOcrL2iTunaDbqmyphr4mjpvPNo0ihxw813Qr4fhAgFXXlVqkx5iVzogWuDH6iI53lEf5t9y5DLYPcAovRXOM6LGGBokzi-v6Z1_oUp5aP6sRktDmWqJC5DCnbMbbbQurUMluzhwAsjPCpMSjWbkGHCZWQ8'],
      category: 'moveis',
      stock: 8,
      specifications: {
        material: 'Madeira Eucalipto Maciça',
        dimensions: '2,03m (L) x 1,93m (P) x 0,40m (A)',
        warranty: '18 meses',
        color: 'Natural/Wenge'
      }
    },
    {
      id: '5',
      name: 'Sofá 3 Lugares Retrátil e Reclinável Millena',
      sku: 'MILL-SOF-3L-GR',
      description: 'O sofá Millena une conforto e sofisticação para sua sala de estar. Produzido com madeira de reflorestamento, possui assento retrátil com espuma D33 e encosto reclinável em fibra siliconada.',
      price: 2499.00,
      brand: 'Millena',
      images: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCzagYd1TeTWCR7ekyx6Q5r8QrlzTZU2fObyeGhxKNZid5IlEYKxQ_V0UipSdFWgOKjsfxbLQquplOJSDsw5XVHiZazbo213OOZMFxxvhwbDJU35AvSurF2UeIaPf19u9OsyAWyZwFgwG21Z_76aUc2-AeIQJWUuhCDEIQhAK8tYVcEabfkPAjn7qS2zDSx_b-uDo1Cxj0DT23xq7Q0clqA4auBG_cCfvYpoPcVIgFNtCL-lhgVpBXjJ8YYOGrdPyxxdeIDln8UJow',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDl1qpLKamhMF1BuCtF5LH_mNQxWloKmM6VAtzf-CSMGKbiVkLO42ZtfSQ_M0aP6Ec__f7nCm63Ewl0nJYI_LO3r74fUlJAhYDtxVjEmoaWgKeM3EpLeXyBsiUpQxEp9H8q-cfpzHOTyIVCHkUWN9_CZ2uC3yQo6hFSCAF6rXyHIXDJoCuigVL_kNj63W_G3NX1qVKDH2Z1F-REBQVbOGqbU5tX4PlrQS16K4HnLUucJj-8VoIbokMTbSJsD8gTYsMnM2K3Nct54Fc',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDet-6-ZDDEYcwT7G1FVCPmHg6DyqBY_h9BsGOy_8HaNSrAK5UtCuNXyWaSkZJV732-_AHk62OOjmmI0Z85iULTkmueVE3ePLt8nQ_0uNO6n2ZiQvqmPwuqJqDZGb8gCWkz3XGKiMQQbdLWfA5xqHhMvPRs1aiUcGjvlRZH7qSq1zJkOq52cIllhfYo-xCq3Lic0Mx59C1g0ajU5-2y2f4fEJmN93ov8nt1txF6qNdNfiGYz2q8wReFJW1IN5KIA3TqYKzRF4c4XSY'
      ],
      category: 'moveis',
      stock: 22,
      specifications: {
        material: 'Madeira Eucalipto / Linho',
        dimensions: '2,30m (L) x 1,05m (A)',
        warranty: '12 meses',
        color: 'Cinza Grafite'
      },
      stockByStore: [
        { storeName: 'Loja Centro', address: 'Rua da Imperatriz, 123', quantity: 5, available: true },
        { storeName: 'Loja Shopping', address: 'Shopping Rio Mar, L2', quantity: 2, available: true },
        { storeName: 'Depósito Central', address: 'CD BR-101, Sul', quantity: 15, available: true },
        { storeName: 'Outras Lojas', address: 'Unidades de Olinda/Jaboatão', quantity: 0, available: false }
      ]
    },
    {
      id: '6',
      name: 'Smart TV 4K 55" Crystal UHD',
      sku: 'ELE-1022',
      description: 'Smart TV 4K 55 polegadas com tecnologia Crystal UHD que oferece imagens de altíssima qualidade com 4 vezes mais pixels que Full HD. Sistema operacional Tizen com acesso a aplicativos de streaming, controle por voz integrado e design sem bordas para imersão total. HDR10+ para cores mais vivas e realistas.',
      price: 3150.00,
      originalPrice: 3499.00,
      brand: 'Samsung',
      images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuBPONmiyRW1zSTFGPHRkekv_DPxOK8cxNx2C89MtAsDNtF09uh3WUWg1ovSDF4Yp-Yo9y1oK35gHw-c6jyE8wwzFoJz8uPaFCnnlQSC_z_CN_OYcbVX4Lntl-iLln6xJ0hT3sbF381yRxseKrpg73IqKAML1m_tuHx2jV7QU5AT7HLW9UVghFHz1un0TFU7fYoAVxIgG_kFzLftl-ACyneffY4DDrSmhVjpwQ6G9oPJBOwiHecur8UX0tbYM9-ACtMi4Jt-rkJhJRo'],
      category: 'eletrodomesticos',
      stock: 10,
      specifications: {
        material: 'Plástico ABS / Tela LED',
        dimensions: '1,23m (L) x 0,73m (A) x 0,06m (P)',
        warranty: '12 meses',
        color: 'Preto'
      }
    },
    {
      id: '7',
      name: 'Geladeira Frost Free 450L',
      sku: 'ELE-8843',
      description: 'Geladeira Frost Free com capacidade total de 450 litros, tecnologia que elimina a formação de gelo automaticamente. Prateleiras reguláveis, gaveta para frutas e verduras, freezer espaçoso e painel de controle digital. Design moderno e eficiência energética classe A, ideal para famílias grandes.',
      price: 4299.00,
      brand: 'Brastemp',
      images: [        'https://lh3.googleusercontent.com/aida-public/AB6AXuDet-6-ZDDEYcwT7G1FVCPmHg6DyqBY_h9BsGOy_8HaNSrAK5UtCuNXyWaSkZJV732-_AHk62OOjmmI0Z85iULTkmueVE3ePLt8nQ_0uNO6n2ZiQvqmPwuqJqDZGb8gCWkz3XGKiMQQbdLWfA5xqHhMvPRs1aiUcGjvlRZH7qSq1zJkOq52cIllhfYo-xCq3Lic0Mx59C1g0ajU5-2y2f4fEJmN93ov8nt1txF6qNdNfiGYz2q8wReFJW1IN5KIA3TqYKzRF4c4XSY'
      ],
      category: 'eletrodomesticos',
      stock: 7,
      specifications: {
        material: 'Aço Inox / Plástico ABS',
        dimensions: '0,70m (L) x 1,85m (A) x 0,72m (P)',
        warranty: '12 meses',
        color: 'Branco'
      }
    },
    {
      id: '8',
      name: 'Fogão 5 Bocas com Mesa de Vidro',
      sku: 'ELE-5521',
      description: 'Fogão moderno com 5 bocas e mesa de vidro temperado, perfeito para cozinhas grandes e famílias que adoram cozinhar. Queimadores de diferentes tamanhos para variados tipos de preparo, forno autolimpante com capacidade de 90 litros e acendimento automático. Mesa de vidro temperado resistente e fácil de limpar.',
      price: 899.00,
      brand: 'Brastemp',
      images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuC0Kij9n43d3D4jGRcw-QvpUarDFZn1cZx0oFW029IqyOuJt5sXy9_pGeqRZVR_vMxmTehpTZQgyVwxDiCMQQCg0CgEuEBtAbLB4MlCzfKFphiJ_xm5aexYdV-BJup448vot0Tc5Bwu_U4OMQVps5Zk_C1AUr1R9rKIpy8rzQpD7qc5iSn-J2pjvbNnZxRsND1UX7GbN_8yCITMI_Tc8Aa8aSnXNpBigixwfMS1auWpFe5EoTChqZ5ouK6zpiMt6EHtMdoHDJaJYS4'],
      category: 'eletrodomesticos',
      stock: 15,
      specifications: {
        material: 'Aço Esmaltado / Vidro Temperado',
        dimensions: '0,90m (L) x 0,85m (P) x 0,90m (A)',
        warranty: '12 meses',
        color: 'Preto/Branco'
      }
    },
    {
      id: '9',
      name: 'Micro-ondas 31L com Painel Inox',
      sku: 'ELE-3321',
      description: 'Micro-ondas 31 litros com painel em inox e múltiplas funções para facilitar seu dia a dia na cozinha. Descongelamento rápido, menu automático com 10 receitas pré-programadas, função grill para gratinar e aquecimento uniforme. Capacidade interna grande para pratos maiores e design moderno que combina com qualquer cozinha.',
      price: 549.00,
      brand: 'Electrolux',
      images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuC3Wl0htksuq4E0MhpC715MKKYhdfIFsG2p_LYSlD54fYvnNiuBQQc0kNb-WQ_FT6NyC0U6I5cr7GyHWKfco_WBz7EDvMyNjuFuQ21qQvee5GEc1fMwGputTU9fis_erUpfeyI41nWaeZzfiLr4wuHSL4-pqMx2urlcxfyI-9zGW8ICNEQ8yQsn7gBVPeWrN7fLWCgEwqcDQusLcL5ijOptPV0qX2ytLsYm2VmoXH4VYaCGxT6MlgeUSo47IBHRkpcvrNmvvEBBma4'],
      category: 'eletrodomesticos',
      stock: 20,
      specifications: {
        material: 'Aço Inox / Vidro',
        dimensions: '0,52m (L) x 0,31m (P) x 0,38m (A)',
        warranty: '12 meses',
        color: 'Inox'
      }
    },
    {
      id: '10',
      name: 'Lavadora de Roupas 12kg',
      sku: 'LAV-1201',
      description: 'Lavadora de roupas com capacidade de 12kg, perfeita para famílias grandes. Tecnologia Turbo Performance que lava mais roupa em menos tempo, múltiplos programas de lavagem incluindo programa para roupas delicadas, economia de água e energia. Painel digital intuitivo e sistema de segurança contra transbordamento.',
      price: 1899.00,
      brand: 'Electrolux',
      images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuAPeoR7NlslHiMjBR24Xq5khOWfCyPrZkD0sry5GN8grv7fKB5u7B7hUsTKpUEcJCuykqw6jx8D4RSgAE6tK2tRPuDGTtu2JgLF-lRuN56yrSkM7qnWaCGTjMaxmmvvxUqFCk3k1TX8FIMTRbMET6t-gwRe6B-k8pl_LjuX6O6nX4NfAgQfhfWAJnVpbbecDOdt-PXDNKGjiCKP7OOLPWx8qE-aAjDq5bmHc0FEGYpNnwU1vk1mZ53djudcjo0-0OhbccDxmAV_OEM'],
      category: 'lavanderia',
      stock: 8,
      specifications: {
        material: 'Plástico ABS / Aço Inox',
        dimensions: '0,60m (L) x 0,60m (P) x 0,90m (A)',
        warranty: '12 meses',
        color: 'Branco'
      }
    },
    {
      id: '11',
      name: 'Secadora de Roupas 10kg',
      sku: 'LAV-1002',
      description: 'Secadora de roupas com capacidade de 10kg e tecnologia de condensação que não precisa de saída de ar externa. Sistema inteligente que ajusta o tempo de secagem automaticamente, programa antiamassamento, filtro de pelos e energia classe A para economia. Ideal para dias chuvosos ou quando você precisa de roupas secas rapidamente.',
      price: 2299.00,
      originalPrice: 2699.00,
      brand: 'Electrolux',
      images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuAxnDoATvRVvnBidbnPIwEqcM3kkbP1xZcmxZF7H8puRztdVCNX_vFH-VLJE1xKQHfqaRapukKBCupPM7dWj2NQmEtJwbHOj5Sg8fxQnESi3tbu37MXcOcrL2iTunaDbqmyphr4mjpvPNo0ihxw813Qr4fhAgFXXlVqkx5iVzogWuDH6iI53lEf5t9y5DLYPcAovRXOM6LGGBokzi-v6Z1_oUp5aP6sRktDmWqJC5DCnbMbbbQurUMluzhwAsjPCpMSjWbkGHCZWQ8'],
      category: 'lavanderia',
      stock: 5,
      specifications: {
        material: 'Plástico ABS / Aço Inox',
        dimensions: '0,60m (L) x 0,65m (P) x 0,85m (A)',
        warranty: '12 meses',
        color: 'Branco'
      }
    },
    {
      id: '12',
      name: 'Ferro de Passar a Vapor',
      sku: 'LAV-3003',
      description: 'Ferro de passar a vapor com tecnologia antiaderente e sistema de jato de vapor vertical. Base cerâmica que desliza suavemente sobre os tecidos, sistema anti-gotejamento, ajuste de temperatura para diferentes tipos de tecido e reservatório de água removível. Perfeito para eliminar rugas com facilidade e rapidez.',
      price: 199.00,
      brand: 'Philco',
      images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuC0Kij9n43d3D4jGRcw-QvpUarDFZn1cZx0oFW029IqyOuJt5sXy9_pGeqRZVR_vMxmTehpTZQgyVwxDiCMQQCg0CgEuEBtAbLB4MlCzfKFphiJ_xm5aexYdV-BJup448vot0Tc5Bwu_U4OMQVps5Zk_C1AUr1R9rKIpy8rzQpD7qc5iSn-J2pjvbNnZxRsND1UX7GbN_8yCITMI_Tc8Aa8aSnXNpBigixwfMS1auWpFe5EoTChqZ5ouK6zpiMt6EHtMdoHDJaJYS4'],
      category: 'lavanderia',
      stock: 25,
      specifications: {
        material: 'Plástico / Base Cerâmica',
        dimensions: '0,30m (L) x 0,15m (P) x 0,13m (A)',
        warranty: '6 meses',
        color: 'Azul/Branco'
      }
    },
    {
      id: '13',
      name: 'Soundbar 5.1 com Subwoofer',
      sku: 'TV-5501',
      description: 'Soundbar 5.1 canais com subwoofer sem fio e tecnologia Dolby Atmos para experiência de som imersiva. Sistema de som surround virtual que cria ambiente de cinema em casa, modo Game Pro para jogos, conexão Bluetooth e HDMI ARC. Potência total de 430W para áudio de alta qualidade.',
      price: 1299.00,
      brand: 'Samsung',
      images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuC3Wl0htksuq4E0MhpC715MKKYhdfIFsG2p_LYSlD54fYvnNiuBQQc0kNb-WQ_FT6NyC0U6I5cr7GyHWKfco_WBz7EDvMyNjuFuQ21qQvee5GEc1fMwGputTU9fis_erUpfeyI41nWaeZzfiLr4wuHSL4-pqMx2urlcxfyI-9zGW8ICNEQ8yQsn7gBVPeWrN7fLWCgEwqcDQusLcL5ijOptPV0qX2ytLsYm2VmoXH4VYaCGxT6MlgeUSo47IBHRkpcvrNmvvEBBma4'],
      category: 'tv-audio',
      stock: 12,
      specifications: {
        material: 'Plástico ABS / Tecido',
        dimensions: '1,05m (L) x 0,12m (A) x 0,06m (P)',
        warranty: '12 meses',
        color: 'Preto'
      }
    },
    {
      id: '14',
      name: 'Smart TV 4K 65" QLED',
      sku: 'TV-6502',
      description: 'Smart TV 4K 65 polegadas com tecnologia QLED que oferece cores 100% do volume de cores DCI-P3 e brilho excepcional. HDR10+ para contraste dinâmico perfeito, Quantum Processor 4K para upscaling inteligente, Tizen OS com acesso completo a aplicativos e design Infinity Screen sem bordas para máxima imersão.',
      price: 4299.00,
      brand: 'Samsung',
      images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuAPeoR7NlslHiMjBR24Xq5khOWfCyPrZkD0sry5GN8grv7fKB5u7B7hUsTKpUEcJCuykqw6jx8D4RSgAE6tK2tRPuDGTtu2JgLF-lRuN56yrSkM7qnWaCGTjMaxmmvvxUqFCk3k1TX8FIMTRbMET6t-gwRe6B-k8pl_LjuX6O6nX4NfAgQfhfWAJnVpbbecDOdt-PXDNKGjiCKP7OOLPWx8qE-aAjDq5bmHc0FEGYpNnwU1vk1mZ53djudcjo0-0OhbccDxmAV_OEM'],
      category: 'tv-audio',
      stock: 6,
      specifications: {
        material: 'Metal / Plástico / Tela QLED',
        dimensions: '1,45m (L) x 0,84m (A) x 0,06m (P)',
        warranty: '12 meses',
        color: 'Preto'
      }
    },
    {
      id: '15',
      name: 'Home Theater 7.1 1000W',
      sku: 'TV-7003',
      description: 'Home Theater 7.1 canais com 1000W de potência total para transformar sua sala em um verdadeiro cinema. Sistema completo com 7 caixas acústicas e subwoofer, suporte para Dolby Digital e DTS, múltiplas entradas HDMI, conexão Bluetooth e controle remoto intuitivo. Som surround realista e potente para filmes, jogos e música.',
      price: 1999.00,
      brand: 'LG',
      images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuAxnDoATvRVvnBidbnPIwEqcM3kkbP1xZcmxZF7H8puRztdVCNX_vFH-VLJE1xKQHfqaRapukKBCupPM7dWj2NQmEtJwbHOj5Sg8fxQnESi3tbu37MXcOcrL2iTunaDbqmyphr4mjpvPNo0ihxw813Qr4fhAgFXXlVqkx5iVzogWuDH6iI53lEf5t9y5DLYPcAovRXOM6LGGBokzi-v6Z1_oUp5aP6sRktDmWqJC5DCnbMbbbQurUMluzhwAsjPCpMSjWbkGHCZWQ8'],
      category: 'tv-audio',
      stock: 9,
      specifications: {
        material: 'Plástico ABS / Tecido / Madeira',
        dimensions: '0,43m (L) x 0,12m (A) x 0,40m (P)',
        warranty: '12 meses',
        color: 'Preto'
      }
    },
    {
      id: '16',
      name: 'Notebook Gamer 15.6" 16GB',
      sku: 'INF-1501',
      description: 'Notebook gamer de alto desempenho com tela 15.6" Full HD 144Hz, processador Intel Core i7 de última geração, 16GB RAM DDR4, SSD 512GB e placa de vídeo dedicada RTX 3050. Teclado RGB retroiluminado, sistema de refrigeração avançado e design agressivo. Perfeito para jogos AAA e trabalho pesado.',
      price: 5499.00,
      brand: 'ASUS',
      images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuC0Kij9n43d3D4jGRcw-QvpUarDFZn1cZx0oFW029IqyOuJt5sXy9_pGeqRZVR_vMxmTehpTZQgyVwxDiCMQQCg0CgEuEBtAbLB4MlCzfKFphiJ_xm5aexYdV-BJup448vot0Tc5Bwu_U4OMQVps5Zk_C1AUr1R9rKIpy8rzQpD7qc5iSn-J2pjvbNnZxRsND1UX7GbN_8yCITMI_Tc8Aa8aSnXNpBigixwfMS1auWpFe5EoTChqZ5ouK6zpiMt6EHtMdoHDJaJYS4'],
      category: 'informatica',
      stock: 4,
      specifications: {
        material: 'Plástico ABS / Alumínio',
        dimensions: '0,36m (L) x 0,26m (P) x 0,025m (A)',
        warranty: '12 meses',
        color: 'Preto'
      }
    },
    {
      id: '17',
      name: 'Mouse Gamer RGB 16000 DPI',
      sku: 'INF-2002',
      description: 'Mouse gamer profissional com iluminação RGB personalizável e sensor óptico de alta precisão de 16000 DPI ajustável. Design ergonômico para grip confortável, 6 botões programáveis, cabo trançado resistente e software para customização completa de perfis, macros e iluminação. Ideal para FPS, MOBA e MMO.',
      price: 299.00,
      brand: 'Logitech',
      images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuC3Wl0htksuq4E0MhpC715MKKYhdfIFsG2p_LYSlD54fYvnNiuBQQc0kNb-WQ_FT6NyC0U6I5cr7GyHWKfco_WBz7EDvMyNjuFuQ21qQvee5GEc1fMwGputTU9fis_erUpfeyI41nWaeZzfiLr4wuHSL4-pqMx2urlcxfyI-9zGW8ICNEQ8yQsn7gBVPeWrN7fLWCgEwqcDQusLcL5ijOptPV0qX2ytLsYm2VmoXH4VYaCGxT6MlgeUSo47IBHRkpcvrNmvvEBBma4'],
      category: 'informatica',
      stock: 18,
      specifications: {
        material: 'Plástico ABS / Borracha',
        dimensions: '0,13m (L) x 0,07m (P) x 0,04m (A)',
        warranty: '12 meses',
        color: 'Preto RGB'
      }
    },
    {
      id: '18',
      name: 'Teclado Mecânico RGB',
      sku: 'INF-3003',
      description: 'Teclado mecânico premium com switches Cherry MX para feedback tátil excepcional e durabilidade de 50 milhões de toques. Iluminação RGB por tecla com 16.8 milhões de cores personalizáveis, base de alumínio anodizado, teclas PBT resistentes ao brilho e software para macros e perfis. Layout completo ABNT2.',
      price: 599.00,
      brand: 'Razer',
      images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuAPeoR7NlslHiMjBR24Xq5khOWfCyPrZkD0sry5GN8grv7fKB5u7B7hUsTKpUEcJCuykqw6jx8D4RSgAE6tK2tRPuDGTtu2JgLF-lRuN56yrSkM7qnWaCGTjMaxmmvvxUqFCk3k1TX8FIMTRbMET6t-gwRe6B-k8pl_LjuX6O6nX4NfAgQfhfWAJnVpbbecDOdt-PXDNKGjiCKP7OOLPWx8qE-aAjDq5bmHc0FEGYpNnwU1vk1mZ53djudcjo0-0OhbccDxmAV_OEM'],
      category: 'informatica',
      stock: 14,
      specifications: {
        material: 'Alumínio Anodizado / PBT',
        dimensions: '0,45m (L) x 0,15m (P) x 0,04m (A)',
        warranty: '12 meses',
        color: 'Preto RGB'
      }
    },
    {
      id: '19',
      name: 'Liquidificador 3 Velocidades',
      sku: 'ELP-4001',
      description: 'Liquidificador potente com 3 velocidades e função pulsar, jarra de vidro temperado de 1,5 litros com marcação de medidas, lâminas em aço inoxidável de 4 pontas para triturar gelo e alimentos duros. Base antiderrapante, tampa com abertura para adicionar ingredientes e design moderno. Perfeito para sucos, vitaminas e smoothies.',
      price: 199.00,
      brand: 'Philco',
      images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuAxnDoATvRVvnBidbnPIwEqcM3kkbP1xZcmxZF7H8puRztdVCNX_vFH-VLJE1xKQHfqaRapukKBCupPM7dWj2NQmEtJwbHOj5Sg8fxQnESi3tbu37MXcOcrL2iTunaDbqmyphr4mjpvPNo0ihxw813Qr4fhAgFXXlVqkx5iVzogWuDH6iI53lEf5t9y5DLYPcAovRXOM6LGGBokzi-v6Z1_oUp5aP6sRktDmWqJC5DCnbMbbbQurUMluzhwAsjPCpMSjWbkGHCZWQ8'],
      category: 'eletroportateis',
      stock: 30,
      specifications: {
        material: 'Vidro Temperado / Plástico ABS',
        dimensions: '0,18m (L) x 0,18m (P) x 0,35m (A)',
        warranty: '6 meses',
        color: 'Branco/Azul'
      }
    },
    {
      id: '20',
      name: 'Batedeira Planetária 5L',
      sku: 'ELP-5002',
      description: 'Batedeira planetária profissional com capacidade de 5 litros, motor potente de 800W e movimento planetário que garante mistura uniforme. Acompanha 3 acessórios: batedor, gancho para massa e fouet. Ideal para fazer bolos, pães, massas e sobremesas. Design robusto e durável para uso profissional ou doméstico intenso.',
      price: 699.00,
      brand: 'KitchenAid',
      images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuC0Kij9n43d3D4jGRcw-QvpUarDFZn1cZx0oFW029IqyOuJt5sXy9_pGeqRZVR_vMxmTehpTZQgyVwxDiCMQQCg0CgEuEBtAbLB4MlCzfKFphiJ_xm5aexYdV-BJup448vot0Tc5Bwu_U4OMQVps5Zk_C1AUr1R9rKIpy8rzQpD7qc5iSn-J2pjvbNnZxRsND1UX7GbN_8yCITMI_Tc8Aa8aSnXNpBigixwfMS1auWpFe5EoTChqZ5ouK6zpiMt6EHtMdoHDJaJYS4'],
      category: 'eletroportateis',
      stock: 11,
      specifications: {
        material: 'Aço Inox / Metal',
        dimensions: '0,40m (L) x 0,30m (P) x 0,42m (A)',
        warranty: '12 meses',
        color: 'Vermelho'
      }
    },
    {
      id: '21',
      name: 'Cafeteira Expresso 15 Bar',
      sku: 'ELP-6003',
      description: 'Cafeteira expresso profissional com pressão de 15 bar para extrair o máximo sabor do café. Sistema de vapor para fazer cappuccino e latte art, bico vaporizador articulado, depósito de água de 1,5 litros e bandeja aquecida para xícaras. Compacta e fácil de usar, perfeita para quem aprecia um bom café espresso em casa.',
      price: 899.00,
      brand: 'Nespresso',
      images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuC3Wl0htksuq4E0MhpC715MKKYhdfIFsG2p_LYSlD54fYvnNiuBQQc0kNb-WQ_FT6NyC0U6I5cr7GyHWKfco_WBz7EDvMyNjuFuQ21qQvee5GEc1fMwGputTU9fis_erUpfeyI41nWaeZzfiLr4wuHSL4-pqMx2urlcxfyI-9zGW8ICNEQ8yQsn7gBVPeWrN7fLWCgEwqcDQusLcL5ijOptPV0qX2ytLsYm2VmoXH4VYaCGxT6MlgeUSo47IBHRkpcvrNmvvEBBma4'],
      category: 'eletroportateis',
      stock: 7,
      specifications: {
        material: 'Plástico ABS / Aço Inox',
        dimensions: '0,31m (L) x 0,26m (P) x 0,35m (A)',
        warranty: '12 meses',
        color: 'Preto/Vermelho'
      }
    },
    {
      id: '22',
      name: 'Jogo de Cama Queen 4 Peças',
      sku: 'CAB-7001',
      description: 'Jogo de cama queen size com 4 peças em algodão egípcio de 200 fios, garantindo suavidade e durabilidade excepcionais. Conjunto inclui 1 lençol de elástico, 1 lençol de cima, 2 fronhas e 1 edredom. Tecido respirável e hipoalergênico, fácil de lavar e manter. Design moderno que combina com qualquer decoração de quarto.',
      price: 399.00,
      brand: 'Teka',
      images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuAPeoR7NlslHiMjBR24Xq5khOWfCyPrZkD0sry5GN8grv7fKB5u7B7hUsTKpUEcJCuykqw6jx8D4RSgAE6tK2tRPuDGTtu2JgLF-lRuN56yrSkM7qnWaCGTjMaxmmvvxUqFCk3k1TX8FIMTRbMET6t-gwRe6B-k8pl_LjuX6O6nX4NfAgQfhfWAJnVpbbecDOdt-PXDNKGjiCKP7OOLPWx8qE-aAjDq5bmHc0FEGYpNnwU1vk1mZ53djudcjo0-0OhbccDxmAV_OEM'],
      category: 'cama-banho',
      stock: 22,
      specifications: {
        material: 'Algodão Egípcio 200 Fios',
        dimensions: 'Queen Size (1,58m x 1,98m)',
        warranty: '6 meses',
        color: 'Branco/Azul claro'
      }
    },
    {
      id: '23',
      name: 'Edredom King Size 300 Fios',
      sku: 'CAB-8002',
      description: 'Edredom king size luxuoso com 300 fios de algodão percal e enchimento de pluma de ganso premium, oferecendo aconchego e calor ideal. Costuras em quadros que mantêm o enchimento distribuído uniformemente, zíper para fácil remoção da capa e fácil manutenção. Perfeito para noites de inverno e decoração sofisticada do quarto.',
      price: 599.00,
      brand: 'Teka',
      images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuAxnDoATvRVvnBidbnPIwEqcM3kkbP1xZcmxZF7H8puRztdVCNX_vFH-VLJE1xKQHfqaRapukKBCupPM7dWj2NQmEtJwbHOj5Sg8fxQnESi3tbu37MXcOcrL2iTunaDbqmyphr4mjpvPNo0ihxw813Qr4fhAgFXXlVqkx5iVzogWuDH6iI53lEf5t9y5DLYPcAovRXOM6LGGBokzi-v6Z1_oUp5aP6sRktDmWqJC5DCnbMbbbQurUMluzhwAsjPCpMSjWbkGHCZWQ8'],
      category: 'cama-banho',
      stock: 15,
      specifications: {
        material: 'Algodão 300 Fios / Pluma de Ganso',
        dimensions: 'King Size (1,93m x 2,03m)',
        warranty: '6 meses',
        color: 'Bege/Creme'
      }
    },
    {
      id: '24',
      name: 'Toalha de Banho Premium 70x140',
      sku: 'CAB-9003',
      description: 'Toalha de banho premium 70x140cm em algodão fio egípcio de altíssima qualidade, extremamente macia e absorvente. Bordas com acabamento especial, gramatura alta para máximo conforto e durabilidade, resistente a lavagens frequentes mantendo a maciez. Perfeita para um banho relaxante e experiência de spa em casa.',
      price: 89.00,
      brand: 'Teka',
      images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuC0Kij9n43d3D4jGRcw-QvpUarDFZn1cZx0oFW029IqyOuJt5sXy9_pGeqRZVR_vMxmTehpTZQgyVwxDiCMQQCg0CgEuEBtAbLB4MlCzfKFphiJ_xm5aexYdV-BJup448vot0Tc5Bwu_U4OMQVps5Zk_C1AUr1R9rKIpy8rzQpD7qc5iSn-J2pjvbNnZxRsND1UX7GbN_8yCITMI_Tc8Aa8aSnXNpBigixwfMS1auWpFe5EoTChqZ5ouK6zpiMt6EHtMdoHDJaJYS4'],
      category: 'cama-banho',
      stock: 40,
      specifications: {
        material: 'Algodão Fio Egípcio',
        dimensions: '0,70m x 1,40m',
        warranty: '6 meses',
        color: 'Branco/Cinza'
      }
    }
  ];

  private categories: Category[] = [
    { id: 'moveis', name: 'Móveis', icon: 'archive' },
    { id: 'eletrodomesticos', name: 'Eletrodomésticos', icon: 'house-door' },
    { id: 'lavanderia', name: 'Lavanderia', icon: 'droplet' },
    { id: 'tv-audio', name: 'TV & Áudio', icon: 'tv' },
    { id: 'informatica', name: 'Informática', icon: 'laptop' },
    { id: 'eletroportateis', name: 'Eletroportáteis', icon: 'lightning' },
    { id: 'cama-banho', name: 'Cama e Banho', icon: 'phone-landscape-fill' }
  ];

  selectedCategory = signal<string>('moveis');
  searchTerm = signal<string>('');

  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: string): Product | undefined {
    return this.products.find(p => p.id === id);
  }

  getProductsByCategory(categoryId: string): Product[] {
    return this.products.filter(p => p.category === categoryId);
  }

  searchProducts(term: string): Product[] {
    if (!term) return this.products;
    const lowerTerm = term.toLowerCase();
    return this.products.filter(p => 
      p.name.toLowerCase().includes(lowerTerm) || 
      p.sku.toLowerCase().includes(lowerTerm)
    );
  }

  getCategories(): Category[] {
    return this.categories;
  }

  getCategoryById(id: string): Category | undefined {
    return this.categories.find(c => c.id === id);
  }
}
