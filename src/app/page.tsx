import { Card } from '@/components/Card';
import { Configuration,PetsApi } from '@/generated';
import { GetPetsResponseSchema } from '@/schemas/pets';

import styles from './page.module.css';

export default async function Home() {
  const api = new PetsApi(new Configuration());
  
  const response = await api.petsGet();    
  try {
    const parsedPets = GetPetsResponseSchema.parse(response.data);
    console.log(parsedPets);
  }
  catch (error) {
   throw new Error('Error on loading pets');
  }
 

  return (
    <div>  
     
      <div className="main">
       
          <h1>Pets</h1>

          <h2>Results</h2>
          <div className={styles.cardContainer}>
            <Card name="Dann" image="/images/ES0AHRx.jpg" />
            <Card name="Annemie" image="/images/wt5AGpR.jpg" />
            <Card name="Daamin" image="/images/cL9Su9q.jpg" />
            <Card name="Dann" image="/images/ES0AHRx.jpg" />
            <Card name="Annemie" image="/images/wt5AGpR.jpg" />
            <Card name="Daamin" image="/images/cL9Su9q.jpg" />
          </div>
       
      </div>
     
    </div>
  );
}
