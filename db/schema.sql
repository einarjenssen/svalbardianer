
-- CATEGORIES
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  parent_id INTEGER REFERENCES categories(id) ON DELETE CASCADE
);

-- LISTINGS
CREATE TABLE listings (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    TYPE TEXT NOT NULL,
    price DOUBLE PRECISION NOT NULL,
    seller_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    location TEXT,
    created TIMESTAMP NOT NULL,
    updated TIMESTAMP NOT NULL,
    status INTEGER NOT NULL,
    tags TEXT,
    cover_image_id UUID NOT NULL DEFAULT gen_random_uuid ()
);

CREATE TABLE listing_comments(
  id BIGSERIAL PRIMARY KEY,
  comment TEXT NOT NULL,
  listing_id BIGINT NOT NULL,
  user_id TEXT NOT NULL,
  created TIMESTAMP NOT NULL,
  updated TIMESTAMP NOT NULL
);

CREATE TABLE listing_image (
  id UUID PRIMARY KEY NOT NULL DEFAULT gen_random_uuid (),
  listing_id BIGINT NOT NULL,
  seller_id INTEGER NOT NULL,
  created TIMESTAMP NOT NULL
)


CREATE TABLE online_store (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  is_shipping BOOLEAN,
  url TEXT NOT NULL,
  verified TEXT NOT NULL,
  last_verified TIMESTAMP NULL,
  min_shipping DOUBLE PRECISION
);




