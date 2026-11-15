import { Music2, Play, X } from "lucide-react";
import style from "./PlaylistItem.module.css";
import { isGuest } from "../../../helpers";
import { useAuth } from "../../../hooks/useAuth";
import { useToast } from "../../../hooks/useToast";
import { useNavigate } from "react-router";
import { STATUS_TOAST } from "../../../consts";
import { useEffect } from "react";

const PlaylistItem = ({ playlist, isShow, setIsShow }) => {
  const configUser = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  
  const openPlaylist = () => {
    setIsShow({ idPlaylist: playlist.id });
  };

  const handlePlay = (event) => {
    event.stopPropagation();
    if (
      isGuest(
        navigate,
        configUser,
        "Чтобы послушать плейлист, сначала войдите в аккаунт и купите тариф",
      )
    ) {
      return;
    }

    if (!configUser.user.user.subscription) {
      toast.showToast("Выберите тариф", STATUS_TOAST.warning);
      return;
    }
  };

  const closePanel = () => {
    setIsShow({ idPlaylist: null });
  };

  useEffect(() => {
    document.body.classList.toggle("lock-scroll", isShow);

    return () => document.body.classList.remove("lock-scroll");
  }, [isShow]);

  return (
    <>
      <div className={style.playlist__wrapper} onClick={openPlaylist}>
        <div className={style.playlist__album}>
          {playlist.img ? (
            <img src={playlist.img} alt="" className={style.playlist__img} />
          ) : (
            <div className={style.playlist__circle}>
              <Music2 size={24} color="#b3aaaa" />
            </div>
          )}
          <div className={style.playlist__play} onClick={handlePlay}>
            <Play size={14} color="#000" />
          </div>
        </div>
        <h3 className={style.playlist__name}>{playlist.name}</h3>
      </div>

      {isShow && (
        <div className={style.panel__overlay}>
          <div className={style.panel__wrapper}>
            <div className={style.panel__header}>
              <span className={style.panel__title}>ПЛЕЙЛИСТ</span>
              <div className={style.panel__close} onClick={closePanel}>
                <X size={14} />
              </div>
            </div>
            <div className={style.panel__album}>
              {playlist.img ? (
                <img src={playlist.img} />
              ) : (
                <div className={style.panel__circle}>
                  <Music2 size={24} color="#b3aaaa" />
                </div>
              )}
            </div>
            <div className={style.panel__info}>
              <h3 className={style.panel__name}>{playlist.name}</h3>
              <p className={style.panel__description}>{playlist.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PlaylistItem;
