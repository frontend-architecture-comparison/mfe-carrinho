export interface ItemCarrinho {
	nome: string;
	imagem: string;
	limiteTotal: number;
	limitePromocional: number;
	anuidade: number;
	quantidade: number;
}

export interface LojaCarrinho {
	nome: string;
	itens: ItemCarrinho[];
}