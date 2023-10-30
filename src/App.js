import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useState } from 'react'; 


function App() {
  const [form, setForm] = useState({ 
    currentWeight: '', 
    count: '',  
    feedPerDay: '',
    feedPerPortion: '',
  }); 

  const feedPerWeight = [
    {weight: 5, feed: 160},
    {weight: 10, feed: 230},
    {weight: 15, feed: 260},
    {weight: 20, feed: 345},
    {weight: 25, feed: 300},
    {weight: 30, feed: 290},
  ]

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => {
      const newForm = { ...prevForm, [name]: value };
  
      if (newForm.currentWeight) {
        let currentWeight = parseFloat(newForm.currentWeight);
        if (!isNaN(currentWeight)) {
          for (let i = 0; i < feedPerWeight.length - 1; i++) {
            if (currentWeight >= feedPerWeight[i].weight && currentWeight < feedPerWeight[i + 1].weight) {
              newForm.feedPerDay = feedPerWeight[i].feed + 
                + ((feedPerWeight[i + 1].feed - feedPerWeight[i].feed) / 5000) * (currentWeight - feedPerWeight[i].weight) * 100;
              break;
            }
          }
        }
      }

      if (newForm.feedPerDay && newForm.count) {
        let count = parseFloat(newForm.count);
        newForm.feedPerPortion = newForm.feedPerDay / count;
        newForm.feedPerPortion = Math.round(newForm.feedPerPortion * 100) / 100;
      }
  
      return newForm;
    });
  };
  


  return (
    <div className="App"> 
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6 col-xl-4">
            <form>
              <div className="form-group">
                <label htmlFor="currentWeight">Текущий вес щенка</label>
                <input 
                  type="number"
                  className="form-control" 
                  id="currentWeight" 
                  name="currentWeight"
                  placeholder="Текущий вес щенка" 
                  value={form.currentWeight}
                  onChange={handleChange}
                  />
              </div>

              <div className="form-group">
                <label htmlFor="count">Количество кормлений в день</label>
                <input 
                  type="number" 
                  className="form-control" 
                  id="count" 
                  name="count"
                  placeholder="Количество кормлений в день" 
                  value={form.count}
                  onChange={handleChange}
                  />
              </div>
            </form>

            <p> 
              Норма грамм в день:<br />
              <strong>{form.feedPerDay}</strong>
            </p>
            <p> 
              Норма грамм за раз:<br />
              <strong>{form.feedPerPortion}</strong>
            </p> 
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
