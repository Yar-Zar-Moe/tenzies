export default function DiceButton(prop) {
  const styles = {
    backgroundColor: prop.isheld ? "#59E391" : "white",
  };
  return (
    <button
      onClick={() => {
        prop.hold(prop.id);
      }}
      className="dice-btn btn btn-light m-2"
      key={prop.id}
      style={styles}
    >
      {prop.value}
    </button>
  );
}
