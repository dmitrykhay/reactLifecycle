import { useEffect, useState } from "react";
import { WatchesItemCC } from "./WatchesItemCC";
import "./watches.css";

interface WatchData {
  title: string;
  zone: string;
}
export const Watches = () => {
	const [watches, setWatches] = useState<WatchData[]>([]);
	const [watch, setWatch] = useState<WatchData>({
    title: '',
    zone: '',
  });

  useEffect(() => {
    console.log('Watches updated:', watches);
	}, [watches]);
	
	const handleClickAdd = (e: React.FormEvent) => {
		e.preventDefault();
		
		if (watch.title && watch.zone) {
			const existingIndex = watches.findIndex((item) => item.title === watch.title);
	
			if (existingIndex !== -1) {
				setWatches((prevWatches) =>
					prevWatches.map((item, index) =>
						index === existingIndex ? { ...item, zone: watch.zone } : item
					)
				);
			} else {
				setWatches((prevWatches) => [...prevWatches, watch]);
			}
			setWatch({
				title: '',
				zone: '',
			});
		}
	}
	
	const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>): void => {
    setWatch((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };
	
	return (
		<div className="watches-container">
			<form className="watches-form" onSubmit={handleClickAdd}>
				<div className="input-wrap">
					<label htmlFor="watches-title">Название</label>
					<input type="text" name="title" id="watches-title" value={watch.title} onChange={handleInputChange} />
				</div>
				<div className="input-wrap">
					<label htmlFor="watches-zone">Временная зона</label>
					<input type="text" name="zone" id="watches-zone" value={watch.zone} onChange={handleInputChange} />
				</div>
				<button className="watches-btn" type="submit">Добавить</button>
			</form>

			<div className="watches">
				{watches.map((item, index) => (
					<WatchesItemCC key={index} title={item.title} zone={item.zone} />
				))}
			</div>
		</div>
	)
}
