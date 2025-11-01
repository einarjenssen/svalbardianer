
-- CATEGORIES
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  parent_id INTEGER REFERENCES categories(id) ON DELETE CASCADE
);

-- LISTINGS
CREATE TABLE listings {
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    -- TYPE?
    price NUMERIC NOT NULL,
    seller_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    location TEXT,
    created_at TIMESTAMP NOT NULL,
    status_id INTEGER NOT NULL,
    cover_image_id UID NOT NULL,
}



