create
    or replace function check_warehouse_capacity() returns trigger
    language plpgsql as
$$
DECLARE
    total_used_capacity DECIMAL(10, 2);
    warehouse_max_capacity
                        DECIMAL(10, 2);
BEGIN -- Get the warehouse capacity
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
    total_used_capacity
        := total_used_capacity + (NEW.quantity * NEW.unit_size);
-- Check if warehouse has enough capacity
    IF
        total_used_capacity > warehouse_max_capacity THEN
        RAISE EXCEPTION 'Warehouse capacity exceeded. Available: %, Required: %',
            warehouse_max_capacity,
            total_used_capacity;
    END IF;
    RETURN NEW;
END;
$$;
alter function check_warehouse_capacity() owner to postgres;
create or replace trigger enforce_warehouse_capacity
    before
        insert
        or
        update
    on stock
    for each row
execute procedure check_warehouse_capacity();
create
    or replace function update_product_timestamp() returns trigger
    language plpgsql as
$$
BEGIN
    NEW.last_updated := CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;
alter function update_product_timestamp() owner to postgres;
create or replace trigger product_timestamp_update
    before
        update
    on product
    for each row
execute procedure update_product_timestamp();
create
    or replace function check_product_availability() returns trigger
    language plpgsql as
$$
DECLARE
    available_quantity INT;
    product_name
                       VARCHAR(100);
BEGIN -- Get total available quantity across all warehouses
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
    IF
        available_quantity < NEW.quantity THEN
        RAISE EXCEPTION 'Insufficient stock for product "%". Available: %, Requested: %',
            product_name,
            available_quantity,
            NEW.quantity;
    END IF;
    RETURN NEW;
END;
$$;
alter function check_product_availability() owner to postgres;
create or replace trigger enforce_product_availability
    before
        insert
    on orderitem
    for each row
execute procedure check_product_availability();
create
    or replace function update_customer_balance() returns trigger
    language plpgsql as
$$
BEGIN -- Add the order total to the customer's balance
    UPDATE Customer
    SET account_balance = account_balance + NEW.total_amount
    WHERE customer_id = NEW.customer_id;
    RETURN NEW;
END;
$$;
alter function update_customer_balance() owner to postgres;
create or replace trigger customer_balance_update
    after
        insert
    on customerorder
    for each row
execute procedure update_customer_balance();
create
    or replace function update_stock_after_order() returns trigger
    language plpgsql as
$$
DECLARE
    remaining_quantity INT;
    warehouse_cursor
        CURSOR FOR
        SELECT warehouse_id,
               quantity
        FROM Stock
        WHERE product_id = NEW.product_id
        ORDER BY quantity DESC;
-- Take from warehouses with most stock first
    warehouse_record
                       RECORD;
BEGIN
    remaining_quantity
        := NEW.quantity;
-- Iterate through warehouses to deduct stock
    OPEN warehouse_cursor;
    LOOP
        FETCH warehouse_cursor INTO warehouse_record;
        EXIT
            WHEN NOT FOUND
                OR remaining_quantity <= 0;
        IF
            warehouse_record.quantity >= remaining_quantity THEN -- Enough stock in this warehouse
            UPDATE Stock
            SET quantity = quantity - remaining_quantity
            WHERE warehouse_id = warehouse_record.warehouse_id
              AND product_id = NEW.product_id;
            remaining_quantity
                := 0;
        ELSE -- Take all available from this warehouse and continue to next
            UPDATE Stock
            SET quantity = 0
            WHERE warehouse_id = warehouse_record.warehouse_id
              AND product_id = NEW.product_id;
            remaining_quantity
                := remaining_quantity - warehouse_record.quantity;
        END IF;
    END LOOP;
    CLOSE warehouse_cursor;
    RETURN NEW;
END;
$$;
alter function update_stock_after_order() owner to postgres;
create or replace trigger stock_update_after_order
    after
        insert
    on orderitem
    for each row
execute procedure update_stock_after_order();