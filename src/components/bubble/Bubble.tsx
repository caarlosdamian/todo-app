import { check } from '../../assets';

export const Bubble = ({ item, handleChange, isDarkmodeActive }: any) => {
  return (
    <div
      className={`header__input--bubble ${isDarkmodeActive} ${
        item.status && 'active'
      }`}
      onClick={handleChange}
    >
      {item.status && <img src={check} alt="check" />}
    </div>
  );
};
