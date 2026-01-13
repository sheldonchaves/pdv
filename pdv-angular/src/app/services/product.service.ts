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
      description: 'Sofá confortável e elegante para sua sala de estar.',
      price: 1299.99,
      images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuC0Kij9n43d3D4jGRcw-QvpUarDFZn1cZx0oFW029IqyOuJt5sXy9_pGeqRZVR_vMxmTehpTZQgyVwxDiCMQQCg0CgEuEBtAbLB4MlCzfKFphiJ_xm5aexYdV-BJup448vot0Tc5Bwu_U4OMQVps5Zk_C1AUr1R9rKIpy8rzQpD7qc5iSn-J2pjvbNnZxRsND1UX7GbN_8yCITMI_Tc8Aa8aSnXNpBigixwfMS1auWpFe5EoTChqZ5ouK6zpiMt6EHtMdoHDJaJYS4'],
      category: 'moveis',
      stock: 12
    },
    {
      id: '2',
      name: 'Mesa de Jantar Moderna',
      sku: 'DT-4410',
      description: 'Mesa de jantar moderna e espaçosa.',
      price: 599.00,
      images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuC3Wl0htksuq4E0MhpC715MKKYhdfIFsG2p_LYSlD54fYvnNiuBQQc0kNb-WQ_FT6NyC0U6I5cr7GyHWKfco_WBz7EDvMyNjuFuQ21qQvee5GEc1fMwGputTU9fis_erUpfeyI41nWaeZzfiLr4wuHSL4-pqMx2urlcxfyI-9zGW8ICNEQ8yQsn7gBVPeWrN7fLWCgEwqcDQusLcL5ijOptPV0qX2ytLsYm2VmoXH4VYaCGxT6MlgeUSo47IBHRkpcvrNmvvEBBma4'],
      category: 'moveis',
      stock: 3
    },
    {
      id: '3',
      name: 'Cadeira ErgoPro',
      sku: 'CH-5521',
      description: 'Cadeira ergonômica para escritório.',
      price: 245.00,
      images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuAPeoR7NlslHiMjBR24Xq5khOWfCyPrZkD0sry5GN8grv7fKB5u7B7hUsTKpUEcJCuykqw6jx8D4RSgAE6tK2tRPuDGTtu2JgLF-lRuN56yrSkM7qnWaCGTjMaxmmvvxUqFCk3k1TX8FIMTRbMET6t-gwRe6B-k8pl_LjuX6O6nX4NfAgQfhfWAJnVpbbecDOdt-PXDNKGjiCKP7OOLPWx8qE-aAjDq5bmHc0FEGYpNnwU1vk1mZ53djudcjo0-0OhbccDxmAV_OEM'],
      category: 'moveis',
      stock: 0
    },
    {
      id: '4',
      name: 'Cama King Size Madeira',
      sku: 'BD-7788',
      description: 'Cama king size em madeira maciça.',
      price: 849.00,
      images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuAxnDoATvRVvnBidbnPIwEqcM3kkbP1xZcmxZF7H8puRztdVCNX_vFH-VLJE1xKQHfqaRapukKBCupPM7dWj2NQmEtJwbHOj5Sg8fxQnESi3tbu37MXcOcrL2iTunaDbqmyphr4mjpvPNo0ihxw813Qr4fhAgFXXlVqkx5iVzogWuDH6iI53lEf5t9y5DLYPcAovRXOM6LGGBokzi-v6Z1_oUp5aP6sRktDmWqJC5DCnbMbbbQurUMluzhwAsjPCpMSjWbkGHCZWQ8'],
      category: 'moveis',
      stock: 8
    },
    {
      id: '5',
      name: 'Sofá 3 Lugares Retrátil e Reclinável Millena',
      sku: 'MILL-SOF-3L-GR',
      description: 'O sofá Millena une conforto e sofisticação para sua sala de estar. Produzido com madeira de reflorestamento, possui assento retrátil com espuma D33 e encosto reclinável em fibra siliconada.',
      price: 2499.00,
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
      description: 'Smart TV 4K com tecnologia Crystal UHD.',
      price: 3150.00,
      images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuBPONmiyRW1zSTFGPHRkekv_DPxOK8cxNx2C89MtAsDNtF09uh3WUWg1ovSDF4Yp-Yo9y1oK35gHw-c6jyE8wwzFoJz8uPaFCnnlQSC_z_CN_OYcbVX4Lntl-iLln6xJ0hT3sbF381yRxseKrpg73IqKAML1m_tuHx2jV7QU5AT7HLW9UVghFHz1un0TFU7fYoAVxIgG_kFzLftl-ACyneffY4DDrSmhVjpwQ6G9oPJBOwiHecur8UX0tbYM9-ACtMi4Jt-rkJhJRo'],
      category: 'eletrodomesticos',
      stock: 10
    },
    {
      id: '7',
      name: 'Geladeira Frost Free 450L',
      sku: 'ELE-8843',
      description: 'Geladeira Frost Free com 450 litros.',
      price: 4299.00,
      images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuAeut8uYxDW8NIBqNNqHCCvdy2pByIGNiO5lWKAHER0PbMa3cegvtXFCv_PY81_4tnsoDnHXWse7ek81aE6m0BRJru3fEBGRqArfNFJufGLErltYu53hi_X_szLn6fE52LXP4eSW3myiLoEUORDI-wNqSBolKlWOvhoN7LFLiekC4YSWxhzJlNenC58bVB0x7uKWrZ_ZoBd-Qy8_RwyavTSISa9nk_SRa6rfgSrIP8f9vTaiGu-QjMiVAoYAtnr9SGafXTdDTvAYYM'],
      category: 'eletrodomesticos',
      stock: 7
    },
    {
      id: '8',
      name: 'Fogão 5 Bocas com Mesa de Vidro',
      sku: 'ELE-5521',
      description: 'Fogão moderno com 5 bocas e mesa de vidro temperado.',
      price: 899.00,
      images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuC0Kij9n43d3D4jGRcw-QvpUarDFZn1cZx0oFW029IqyOuJt5sXy9_pGeqRZVR_vMxmTehpTZQgyVwxDiCMQQCg0CgEuEBtAbLB4MlCzfKFphiJ_xm5aexYdV-BJup448vot0Tc5Bwu_U4OMQVps5Zk_C1AUr1R9rKIpy8rzQpD7qc5iSn-J2pjvbNnZxRsND1UX7GbN_8yCITMI_Tc8Aa8aSnXNpBigixwfMS1auWpFe5EoTChqZ5ouK6zpiMt6EHtMdoHDJaJYS4'],
      category: 'eletrodomesticos',
      stock: 15
    },
    {
      id: '9',
      name: 'Micro-ondas 31L com Painel Inox',
      sku: 'ELE-3321',
      description: 'Micro-ondas 31 litros com painel em inox e múltiplas funções.',
      price: 549.00,
      images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuC3Wl0htksuq4E0MhpC715MKKYhdfIFsG2p_LYSlD54fYvnNiuBQQc0kNb-WQ_FT6NyC0U6I5cr7GyHWKfco_WBz7EDvMyNjuFuQ21qQvee5GEc1fMwGputTU9fis_erUpfeyI41nWaeZzfiLr4wuHSL4-pqMx2urlcxfyI-9zGW8ICNEQ8yQsn7gBVPeWrN7fLWCgEwqcDQusLcL5ijOptPV0qX2ytLsYm2VmoXH4VYaCGxT6MlgeUSo47IBHRkpcvrNmvvEBBma4'],
      category: 'eletrodomesticos',
      stock: 20
    },
    {
      id: '10',
      name: 'Lavadora de Roupas 12kg',
      sku: 'LAV-1201',
      description: 'Lavadora de roupas com capacidade de 12kg e múltiplos programas.',
      price: 1899.00,
      images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuAPeoR7NlslHiMjBR24Xq5khOWfCyPrZkD0sry5GN8grv7fKB5u7B7hUsTKpUEcJCuykqw6jx8D4RSgAE6tK2tRPuDGTtu2JgLF-lRuN56yrSkM7qnWaCGTjMaxmmvvxUqFCk3k1TX8FIMTRbMET6t-gwRe6B-k8pl_LjuX6O6nX4NfAgQfhfWAJnVpbbecDOdt-PXDNKGjiCKP7OOLPWx8qE-aAjDq5bmHc0FEGYpNnwU1vk1mZ53djudcjo0-0OhbccDxmAV_OEM'],
      category: 'lavanderia',
      stock: 8
    },
    {
      id: '11',
      name: 'Secadora de Roupas 10kg',
      sku: 'LAV-1002',
      description: 'Secadora de roupas com capacidade de 10kg e tecnologia de condensação.',
      price: 2299.00,
      images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuAxnDoATvRVvnBidbnPIwEqcM3kkbP1xZcmxZF7H8puRztdVCNX_vFH-VLJE1xKQHfqaRapukKBCupPM7dWj2NQmEtJwbHOj5Sg8fxQnESi3tbu37MXcOcrL2iTunaDbqmyphr4mjpvPNo0ihxw813Qr4fhAgFXXlVqkx5iVzogWuDH6iI53lEf5t9y5DLYPcAovRXOM6LGGBokzi-v6Z1_oUp5aP6sRktDmWqJC5DCnbMbbbQurUMluzhwAsjPCpMSjWbkGHCZWQ8'],
      category: 'lavanderia',
      stock: 5
    },
    {
      id: '12',
      name: 'Ferro de Passar a Vapor',
      sku: 'LAV-3003',
      description: 'Ferro de passar a vapor com tecnologia antiaderente.',
      price: 199.00,
      images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuC0Kij9n43d3D4jGRcw-QvpUarDFZn1cZx0oFW029IqyOuJt5sXy9_pGeqRZVR_vMxmTehpTZQgyVwxDiCMQQCg0CgEuEBtAbLB4MlCzfKFphiJ_xm5aexYdV-BJup448vot0Tc5Bwu_U4OMQVps5Zk_C1AUr1R9rKIpy8rzQpD7qc5iSn-J2pjvbNnZxRsND1UX7GbN_8yCITMI_Tc8Aa8aSnXNpBigixwfMS1auWpFe5EoTChqZ5ouK6zpiMt6EHtMdoHDJaJYS4'],
      category: 'lavanderia',
      stock: 25
    },
    {
      id: '13',
      name: 'Soundbar 5.1 com Subwoofer',
      sku: 'TV-5501',
      description: 'Soundbar 5.1 canais com subwoofer sem fio e tecnologia Dolby Atmos.',
      price: 1299.00,
      images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuC3Wl0htksuq4E0MhpC715MKKYhdfIFsG2p_LYSlD54fYvnNiuBQQc0kNb-WQ_FT6NyC0U6I5cr7GyHWKfco_WBz7EDvMyNjuFuQ21qQvee5GEc1fMwGputTU9fis_erUpfeyI41nWaeZzfiLr4wuHSL4-pqMx2urlcxfyI-9zGW8ICNEQ8yQsn7gBVPeWrN7fLWCgEwqcDQusLcL5ijOptPV0qX2ytLsYm2VmoXH4VYaCGxT6MlgeUSo47IBHRkpcvrNmvvEBBma4'],
      category: 'tv-audio',
      stock: 12
    },
    {
      id: '14',
      name: 'Smart TV 4K 65" QLED',
      sku: 'TV-6502',
      description: 'Smart TV 4K 65 polegadas com tecnologia QLED e HDR10+.',
      price: 4299.00,
      images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuAPeoR7NlslHiMjBR24Xq5khOWfCyPrZkD0sry5GN8grv7fKB5u7B7hUsTKpUEcJCuykqw6jx8D4RSgAE6tK2tRPuDGTtu2JgLF-lRuN56yrSkM7qnWaCGTjMaxmmvvxUqFCk3k1TX8FIMTRbMET6t-gwRe6B-k8pl_LjuX6O6nX4NfAgQfhfWAJnVpbbecDOdt-PXDNKGjiCKP7OOLPWx8qE-aAjDq5bmHc0FEGYpNnwU1vk1mZ53djudcjo0-0OhbccDxmAV_OEM'],
      category: 'tv-audio',
      stock: 6
    },
    {
      id: '15',
      name: 'Home Theater 7.1 1000W',
      sku: 'TV-7003',
      description: 'Home Theater 7.1 canais com 1000W de potência total.',
      price: 1999.00,
      images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuAxnDoATvRVvnBidbnPIwEqcM3kkbP1xZcmxZF7H8puRztdVCNX_vFH-VLJE1xKQHfqaRapukKBCupPM7dWj2NQmEtJwbHOj5Sg8fxQnESi3tbu37MXcOcrL2iTunaDbqmyphr4mjpvPNo0ihxw813Qr4fhAgFXXlVqkx5iVzogWuDH6iI53lEf5t9y5DLYPcAovRXOM6LGGBokzi-v6Z1_oUp5aP6sRktDmWqJC5DCnbMbbbQurUMluzhwAsjPCpMSjWbkGHCZWQ8'],
      category: 'tv-audio',
      stock: 9
    },
    {
      id: '16',
      name: 'Notebook Gamer 15.6" 16GB',
      sku: 'INF-1501',
      description: 'Notebook gamer com tela 15.6", 16GB RAM e placa de vídeo dedicada.',
      price: 5499.00,
      images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuC0Kij9n43d3D4jGRcw-QvpUarDFZn1cZx0oFW029IqyOuJt5sXy9_pGeqRZVR_vMxmTehpTZQgyVwxDiCMQQCg0CgEuEBtAbLB4MlCzfKFphiJ_xm5aexYdV-BJup448vot0Tc5Bwu_U4OMQVps5Zk_C1AUr1R9rKIpy8rzQpD7qc5iSn-J2pjvbNnZxRsND1UX7GbN_8yCITMI_Tc8Aa8aSnXNpBigixwfMS1auWpFe5EoTChqZ5ouK6zpiMt6EHtMdoHDJaJYS4'],
      category: 'informatica',
      stock: 4
    },
    {
      id: '17',
      name: 'Mouse Gamer RGB 16000 DPI',
      sku: 'INF-2002',
      description: 'Mouse gamer com iluminação RGB e sensor de 16000 DPI.',
      price: 299.00,
      images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuC3Wl0htksuq4E0MhpC715MKKYhdfIFsG2p_LYSlD54fYvnNiuBQQc0kNb-WQ_FT6NyC0U6I5cr7GyHWKfco_WBz7EDvMyNjuFuQ21qQvee5GEc1fMwGputTU9fis_erUpfeyI41nWaeZzfiLr4wuHSL4-pqMx2urlcxfyI-9zGW8ICNEQ8yQsn7gBVPeWrN7fLWCgEwqcDQusLcL5ijOptPV0qX2ytLsYm2VmoXH4VYaCGxT6MlgeUSo47IBHRkpcvrNmvvEBBma4'],
      category: 'informatica',
      stock: 18
    },
    {
      id: '18',
      name: 'Teclado Mecânico RGB',
      sku: 'INF-3003',
      description: 'Teclado mecânico com switches Cherry MX e iluminação RGB.',
      price: 599.00,
      images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuAPeoR7NlslHiMjBR24Xq5khOWfCyPrZkD0sry5GN8grv7fKB5u7B7hUsTKpUEcJCuykqw6jx8D4RSgAE6tK2tRPuDGTtu2JgLF-lRuN56yrSkM7qnWaCGTjMaxmmvvxUqFCk3k1TX8FIMTRbMET6t-gwRe6B-k8pl_LjuX6O6nX4NfAgQfhfWAJnVpbbecDOdt-PXDNKGjiCKP7OOLPWx8qE-aAjDq5bmHc0FEGYpNnwU1vk1mZ53djudcjo0-0OhbccDxmAV_OEM'],
      category: 'informatica',
      stock: 14
    },
    {
      id: '19',
      name: 'Liquidificador 3 Velocidades',
      sku: 'ELP-4001',
      description: 'Liquidificador com 3 velocidades e jarra de vidro de 1,5L.',
      price: 199.00,
      images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuAxnDoATvRVvnBidbnPIwEqcM3kkbP1xZcmxZF7H8puRztdVCNX_vFH-VLJE1xKQHfqaRapukKBCupPM7dWj2NQmEtJwbHOj5Sg8fxQnESi3tbu37MXcOcrL2iTunaDbqmyphr4mjpvPNo0ihxw813Qr4fhAgFXXlVqkx5iVzogWuDH6iI53lEf5t9y5DLYPcAovRXOM6LGGBokzi-v6Z1_oUp5aP6sRktDmWqJC5DCnbMbbbQurUMluzhwAsjPCpMSjWbkGHCZWQ8'],
      category: 'eletroportateis',
      stock: 30
    },
    {
      id: '20',
      name: 'Batedeira Planetária 5L',
      sku: 'ELP-5002',
      description: 'Batedeira planetária com capacidade de 5 litros e 3 acessórios.',
      price: 699.00,
      images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuC0Kij9n43d3D4jGRcw-QvpUarDFZn1cZx0oFW029IqyOuJt5sXy9_pGeqRZVR_vMxmTehpTZQgyVwxDiCMQQCg0CgEuEBtAbLB4MlCzfKFphiJ_xm5aexYdV-BJup448vot0Tc5Bwu_U4OMQVps5Zk_C1AUr1R9rKIpy8rzQpD7qc5iSn-J2pjvbNnZxRsND1UX7GbN_8yCITMI_Tc8Aa8aSnXNpBigixwfMS1auWpFe5EoTChqZ5ouK6zpiMt6EHtMdoHDJaJYS4'],
      category: 'eletroportateis',
      stock: 11
    },
    {
      id: '21',
      name: 'Cafeteira Expresso 15 Bar',
      sku: 'ELP-6003',
      description: 'Cafeteira expresso com pressão de 15 bar e sistema de cappuccino.',
      price: 899.00,
      images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuC3Wl0htksuq4E0MhpC715MKKYhdfIFsG2p_LYSlD54fYvnNiuBQQc0kNb-WQ_FT6NyC0U6I5cr7GyHWKfco_WBz7EDvMyNjuFuQ21qQvee5GEc1fMwGputTU9fis_erUpfeyI41nWaeZzfiLr4wuHSL4-pqMx2urlcxfyI-9zGW8ICNEQ8yQsn7gBVPeWrN7fLWCgEwqcDQusLcL5ijOptPV0qX2ytLsYm2VmoXH4VYaCGxT6MlgeUSo47IBHRkpcvrNmvvEBBma4'],
      category: 'eletroportateis',
      stock: 7
    },
    {
      id: '22',
      name: 'Jogo de Cama Queen 4 Peças',
      sku: 'CAB-7001',
      description: 'Jogo de cama queen size com 4 peças em algodão egípcio.',
      price: 399.00,
      images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuAPeoR7NlslHiMjBR24Xq5khOWfCyPrZkD0sry5GN8grv7fKB5u7B7hUsTKpUEcJCuykqw6jx8D4RSgAE6tK2tRPuDGTtu2JgLF-lRuN56yrSkM7qnWaCGTjMaxmmvvxUqFCk3k1TX8FIMTRbMET6t-gwRe6B-k8pl_LjuX6O6nX4NfAgQfhfWAJnVpbbecDOdt-PXDNKGjiCKP7OOLPWx8qE-aAjDq5bmHc0FEGYpNnwU1vk1mZ53djudcjo0-0OhbccDxmAV_OEM'],
      category: 'cama-banho',
      stock: 22
    },
    {
      id: '23',
      name: 'Edredom King Size 300 Fios',
      sku: 'CAB-8002',
      description: 'Edredom king size com 300 fios e enchimento de pluma de ganso.',
      price: 599.00,
      images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuAxnDoATvRVvnBidbnPIwEqcM3kkbP1xZcmxZF7H8puRztdVCNX_vFH-VLJE1xKQHfqaRapukKBCupPM7dWj2NQmEtJwbHOj5Sg8fxQnESi3tbu37MXcOcrL2iTunaDbqmyphr4mjpvPNo0ihxw813Qr4fhAgFXXlVqkx5iVzogWuDH6iI53lEf5t9y5DLYPcAovRXOM6LGGBokzi-v6Z1_oUp5aP6sRktDmWqJC5DCnbMbbbQurUMluzhwAsjPCpMSjWbkGHCZWQ8'],
      category: 'cama-banho',
      stock: 15
    },
    {
      id: '24',
      name: 'Toalha de Banho Premium 70x140',
      sku: 'CAB-9003',
      description: 'Toalha de banho premium 70x140cm em algodão fio egípcio.',
      price: 89.00,
      images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuC0Kij9n43d3D4jGRcw-QvpUarDFZn1cZx0oFW029IqyOuJt5sXy9_pGeqRZVR_vMxmTehpTZQgyVwxDiCMQQCg0CgEuEBtAbLB4MlCzfKFphiJ_xm5aexYdV-BJup448vot0Tc5Bwu_U4OMQVps5Zk_C1AUr1R9rKIpy8rzQpD7qc5iSn-J2pjvbNnZxRsND1UX7GbN_8yCITMI_Tc8Aa8aSnXNpBigixwfMS1auWpFe5EoTChqZ5ouK6zpiMt6EHtMdoHDJaJYS4'],
      category: 'cama-banho',
      stock: 40
    }
  ];

  private categories: Category[] = [
    { id: 'moveis', name: 'Móveis', icon: 'sofa' },
    { id: 'eletrodomesticos', name: 'Eletrodomésticos', icon: 'house-door' },
    { id: 'lavanderia', name: 'Lavanderia', icon: 'droplet' },
    { id: 'tv-audio', name: 'TV & Áudio', icon: 'tv' },
    { id: 'informatica', name: 'Informática', icon: 'laptop' },
    { id: 'eletroportateis', name: 'Eletroportáteis', icon: 'lightning' },
    { id: 'cama-banho', name: 'Cama e Banho', icon: 'bed' }
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
