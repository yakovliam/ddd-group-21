create table if not exists useraccount
(
    user_id         serial
        primary key,
    username        varchar(50)  not null
        unique,
    password_hash   varchar(255) not null,
    email           varchar(100) not null
        unique,
    phone_number    varchar(20),
    date_registered timestamp   default CURRENT_TIMESTAMP,
    last_login      timestamp,
    account_status  varchar(20) default 'active'::character varying
        constraint useraccount_account_status_check
            check ((account_status)::text = ANY
                   ((ARRAY ['active'::character varying, 'inactive'::character varying, 'suspended'::character varying])::text[])),
    user_type       varchar(10)  not null
        constraint useraccount_user_type_check
            check ((user_type)::text = ANY ((ARRAY ['customer'::character varying, 'staff'::character varying])::text[]))
);

alter table useraccount
    owner to postgres;

create table if not exists customer
(
    customer_id     serial
        primary key,
    user_id         integer     not null
        references useraccount
            on delete cascade,
    first_name      varchar(50) not null,
    last_name       varchar(50) not null,
    account_balance numeric(10, 2) default 0.00
);

alter table customer
    owner to postgres;

create table if not exists staffmember
(
    staff_id   serial
        primary key,
    user_id    integer        not null
        references useraccount
            on delete cascade,
    first_name varchar(50)    not null,
    last_name  varchar(50)    not null,
    salary     numeric(10, 2) not null,
    job_title  varchar(100)   not null,
    hire_date  date           not null
);

alter table staffmember
    owner to postgres;

create table if not exists address
(
    address_id     serial
        primary key,
    user_id        integer      not null
        references useraccount
            on delete cascade,
    address_type   varchar(20)  not null
        constraint address_address_type_check
            check ((address_type)::text = ANY
                   ((ARRAY ['delivery'::character varying, 'payment'::character varying, 'staff'::character varying, 'warehouse'::character varying, 'supplier'::character varying])::text[])),
    street_address varchar(100) not null,
    city           varchar(50)  not null,
    state          varchar(50)  not null,
    postal_code    varchar(20)  not null,
    country        varchar(50)  not null,
    is_default     boolean default false
);

alter table address
    owner to postgres;

create index if not exists idx_address_user
    on address (user_id);

create index if not exists idx_address_type
    on address (address_type);

create table if not exists creditcard
(
    card_id            serial
        primary key,
    customer_id        integer      not null
        references customer
            on delete cascade,
    card_number        varchar(19)  not null,
    cardholder_name    varchar(100) not null,
    expiration_date    date         not null,
    cvv                varchar(4)   not null,
    payment_address_id integer      not null
        references address,
    is_default         boolean default false
);

alter table creditcard
    owner to postgres;

create table if not exists productcategory
(
    category_id   serial
        primary key,
    category_name varchar(50) not null
        unique,
    description   text
);

alter table productcategory
    owner to postgres;

create table if not exists product
(
    product_id    serial
        primary key,
    category_id   integer        not null
        references productcategory,
    name          varchar(100)   not null,
    brand         varchar(50)    not null,
    description   text,
    size          varchar(20),
    weight        numeric(10, 2),
    current_price numeric(10, 2) not null,
    image_url     varchar(255),
    creation_date timestamp default CURRENT_TIMESTAMP,
    last_updated  timestamp default CURRENT_TIMESTAMP,
    product_type  varchar(50)    not null
);

alter table product
    owner to postgres;

create index if not exists idx_product_name
    on product (name);

create index if not exists idx_product_brand
    on product (brand);

create index if not exists idx_product_category
    on product (category_id);

create index if not exists idx_product_type
    on product (product_type);

create table if not exists warehouse
(
    warehouse_id   serial
        primary key,
    warehouse_name varchar(100) not null,
    address_id     integer      not null
        references address,
    capacity       numeric(10, 2)
);

alter table warehouse
    owner to postgres;

create table if not exists stock
(
    stock_id       serial
        primary key,
    product_id     integer not null
        references product,
    warehouse_id   integer not null
        references warehouse,
    quantity       integer not null,
    unit_size      numeric(10, 2) default 1.0,
    last_restocked timestamp      default CURRENT_TIMESTAMP,
    unique (product_id, warehouse_id)
);

alter table stock
    owner to postgres;

create index if not exists idx_stock_product
    on stock (product_id);

create index if not exists idx_stock_warehouse
    on stock (warehouse_id);

create table if not exists customerorder
(
    order_id     serial
        primary key,
    customer_id  integer        not null
        references customer,
    order_date   timestamp default CURRENT_TIMESTAMP,
    status       varchar(20)    not null
        constraint customerorder_status_check
            check ((status)::text = ANY
                   ((ARRAY ['issued'::character varying, 'sent'::character varying, 'received'::character varying, 'cancelled'::character varying])::text[])),
    card_id      integer        not null
        references creditcard,
    total_amount numeric(10, 2) not null
);

alter table customerorder
    owner to postgres;

create index if not exists idx_order_customer
    on customerorder (customer_id);

create index if not exists idx_order_status
    on customerorder (status);

create index if not exists idx_order_date
    on customerorder (order_date);

create table if not exists deliveryplan
(
    delivery_id         serial
        primary key,
    order_id            integer        not null
        references customerorder,
    delivery_type       varchar(20)    not null
        constraint deliveryplan_delivery_type_check
            check ((delivery_type)::text = ANY
                   ((ARRAY ['standard'::character varying, 'express'::character varying])::text[])),
    delivery_price      numeric(10, 2) not null,
    ship_date           date,
    delivery_date       date,
    delivery_address_id integer        not null
        references address
);

alter table deliveryplan
    owner to postgres;

create table if not exists orderitem
(
    order_item_id     serial
        primary key,
    order_id          integer        not null
        references customerorder,
    product_id        integer        not null
        references product,
    quantity          integer        not null,
    price_at_purchase numeric(10, 2) not null
);

alter table orderitem
    owner to postgres;

create index if not exists idx_orderitem_order
    on orderitem (order_id);

create index if not exists idx_orderitem_product
    on orderitem (product_id);

create table if not exists supplier
(
    supplier_id   serial
        primary key,
    supplier_name varchar(100) not null,
    address_id    integer      not null
        references address,
    contact_name  varchar(100),
    contact_email varchar(100),
    contact_phone varchar(20)
);

alter table supplier
    owner to postgres;

create table if not exists supplierproduct
(
    supplier_product_id    serial
        primary key,
    supplier_id            integer        not null
        references supplier,
    product_id             integer        not null
        references product,
    supplier_price         numeric(10, 2) not null,
    minimum_order_quantity integer default 1,
    lead_time_days         integer,
    unique (supplier_id, product_id)
);

alter table supplierproduct
    owner to postgres;

create or replace function check_warehouse_capacity() returns trigger
    language plpgsql
as
$$
DECLARE
    total_used_capacity    DECIMAL(10, 2);
    warehouse_max_capacity DECIMAL(10, 2);
BEGIN
    -- Get the warehouse capacity
    SELECT capacity
    INTO warehouse_max_capacity
    FROM Warehouse
    WHERE warehouse_id = NEW.warehouse_id;

    -- Calculate total used capacity (including the new stock)
    SELECT COALESCE(SUM(s.quantity * s.unit_size), 0)
    INTO total_used_capacity
    FROM Stock s
    WHERE s.warehouse_id = NEW.warehouse_id
      AND s.product_id != NEW.product_id;

    -- Add the new stock's capacity
    total_used_capacity := total_used_capacity + (NEW.quantity * NEW.unit_size);

    -- Check if warehouse has enough capacity
    IF total_used_capacity > warehouse_max_capacity THEN
        RAISE EXCEPTION 'Warehouse capacity exceeded. Available: %, Required: %',
            warehouse_max_capacity, total_used_capacity;
    END IF;

    RETURN NEW;
END;
$$;

alter function check_warehouse_capacity() owner to postgres;

create trigger enforce_warehouse_capacity
    before insert or update
    on stock
    for each row
execute procedure check_warehouse_capacity();

create or replace function update_product_timestamp() returns trigger
    language plpgsql
as
$$
BEGIN
    NEW.last_updated := CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;

alter function update_product_timestamp() owner to postgres;

create trigger product_timestamp_update
    before update
    on product
    for each row
execute procedure update_product_timestamp();

create or replace function check_product_availability() returns trigger
    language plpgsql
as
$$
DECLARE
    available_quantity INT;
    product_name       VARCHAR(100);
BEGIN
    -- Get total available quantity across all warehouses
    SELECT COALESCE(SUM(quantity), 0)
    INTO available_quantity
    FROM Stock
    WHERE product_id = NEW.product_id;

    -- Get product name for error message
    SELECT name
    INTO product_name
    FROM Product
    WHERE product_id = NEW.product_id;

    -- Check if enough product is available
    IF available_quantity < NEW.quantity THEN
        RAISE EXCEPTION 'Insufficient stock for product "%". Available: %, Requested: %',
            product_name, available_quantity, NEW.quantity;
    END IF;

    RETURN NEW;
END;
$$;

alter function check_product_availability() owner to postgres;

create trigger enforce_product_availability
    before insert
    on orderitem
    for each row
execute procedure check_product_availability();

create or replace function update_customer_balance() returns trigger
    language plpgsql
as
$$
BEGIN
    -- Add the order total to the customer's balance
    UPDATE Customer
    SET account_balance = account_balance + NEW.total_amount
    WHERE customer_id = NEW.customer_id;

    RETURN NEW;
END;
$$;

alter function update_customer_balance() owner to postgres;

create trigger customer_balance_update
    after insert
    on customerorder
    for each row
execute procedure update_customer_balance();

create or replace function update_stock_after_order() returns trigger
    language plpgsql
as
$$
DECLARE
    remaining_quantity INT;
    warehouse_cursor CURSOR FOR
        SELECT warehouse_id, quantity
        FROM Stock
        WHERE product_id = NEW.product_id
        ORDER BY quantity DESC; -- Take from warehouses with most stock first
    warehouse_record   RECORD;
BEGIN
    remaining_quantity := NEW.quantity;

    -- Iterate through warehouses to deduct stock
    OPEN warehouse_cursor;
    LOOP
        FETCH warehouse_cursor INTO warehouse_record;
        EXIT WHEN NOT FOUND OR remaining_quantity <= 0;

        IF warehouse_record.quantity >= remaining_quantity THEN
            -- Enough stock in this warehouse
            UPDATE Stock
            SET quantity = quantity - remaining_quantity
            WHERE warehouse_id = warehouse_record.warehouse_id
              AND product_id = NEW.product_id;
            remaining_quantity := 0;
        ELSE
            -- Take all available from this warehouse and continue to next
            UPDATE Stock
            SET quantity = 0
            WHERE warehouse_id = warehouse_record.warehouse_id
              AND product_id = NEW.product_id;
            remaining_quantity := remaining_quantity - warehouse_record.quantity;
        END IF;
    END LOOP;
    CLOSE warehouse_cursor;

    RETURN NEW;
END;
$$;

alter function update_stock_after_order() owner to postgres;

create trigger stock_update_after_order
    after insert
    on orderitem
    for each row
execute procedure update_stock_after_order();


