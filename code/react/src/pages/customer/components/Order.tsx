type Props = { hidden?: boolean };

const Order = (props: Props) => {
  return <div className={`${props.hidden ? "hidden" : ""}`}>Order</div>;
};

export default Order;
