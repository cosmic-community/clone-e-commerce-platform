export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
  locale?: string;
}

export interface Product extends CosmicObject {
  type: 'products';
  locale?: string;
  metadata: {
    name: string;
    description: string;
    price: number;
    sale_price?: number | null;
    images: Array<{
      url: string;
      imgix_url: string;
    }>;
    category: Category | string; // Can be full object or just ID
    sizes?: string[];
    colors?: string[];
    product_type?: {
      key: string;
      value: string;
    };
    featured?: boolean;
    new_release?: boolean;
  };
}

export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    name: string;
    description?: string;
    image?: {
      url: string;
      imgix_url: string;
    };
    parent_category?: Category | null;
    target_audience?: {
      key: string;
      value: string;
    };
  };
}

export interface CategoryWithProducts extends Category {
  products: Product[];
}

export interface Athlete extends CosmicObject {
  type: 'athletes';
  metadata: {
    name: string;
    sport?: {
      key: string;
      value: string;
    };
    bio: string;
    profile_image?: {
      url: string;
      imgix_url: string;
    };
    action_shot?: {
      url: string;
      imgix_url: string;
    };
    signature_products?: Product[];
    featured?: boolean;
  };
}

export interface Collection extends CosmicObject {
  type: 'collections';
  metadata: {
    name: string;
    description: string;
    hero_image?: {
      url: string;
      imgix_url: string;
    };
    products?: Product[];
    launch_date?: string;
    limited_edition?: boolean;
  };
}

export interface Article extends CosmicObject {
  type: 'articles';
  metadata: {
    headline: string;
    excerpt: string;
    content: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    author: string;
    publish_date: string;
    tags?: string[];
  };
}

export interface Store extends CosmicObject {
  type: 'stores';
  metadata: {
    name: string;
    address: string;
    phone?: string;
    hours: string;
    image?: {
      url: string;
      imgix_url: string;
    };
    services?: string[];
  };
}

export interface Page extends CosmicObject {
  type: 'pages';
  metadata: {
    title: string;
    content: string;
    meta_description?: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
  };
}

export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}