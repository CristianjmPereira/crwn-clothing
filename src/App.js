import Directory from './components/directory/directory.component';
import jsonCategories from './resources/categories.json';

const App = () => {
    const categories = jsonCategories;

    return (
      <Directory categories={categories}/>
    );
};

export default App;
