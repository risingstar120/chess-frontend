import React, {useState, useContext, useEffect} from 'react';

const ChessContext = React.createContext();

export function useChess() {
  return useContext(ChessContext);
}

export function ChessProvider({children}) {
  // ----- SEARCH -----
  // Para la creación de partidas
  const [gameType, setGameType] = useState('AI');
  const [selModal, openSelModal] = useState(false);
  const [inQueue, setInQueue] = useState(false);

  const switchModal = () => openSelModal(!selModal);

  // ----- CUSTOMIZATION -----
  const [customization, setCustom] = useState();
  const setData = (board, whitePiece, blackPiece) => setCustom({board, whitePiece, blackPiece});

  useEffect(() => {
    const data = localStorage.getItem('customization-reign');
    if (data) {
      setCustom(JSON.parse(data));
    } else {
      setCustom({
        board: 'wood',
        whitePiece: 'medieval',
        blackPiece: 'medieval',
      });
    }
  }, []);


  useEffect(() => {
    if (!customization || typeof customization !== 'object') return;
    localStorage.setItem('customization-reign', JSON.stringify(customization));
  }, [customization]);

  if (!customization) {
    return null;
  }

  return (
    <ChessContext.Provider value={{
      // ----- SEARCH -----
      gameType, setGameType,
      selModal, switchModal,
      inQueue, setInQueue,
      // ----- CUSTOMIZATION -----
      customization,
      setData,
    }}>
      {children}
    </ChessContext.Provider>
  );
}
