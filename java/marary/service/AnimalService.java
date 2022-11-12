package marary.service;

import marary.domain.Animal;
import marary.persistence.AnimalDao;

import java.sql.SQLException;
import java.util.List;

public class AnimalService {
    private AnimalDao animalDao;
    public AnimalService(){
        this.animalDao=new AnimalDao();
    }

    public List<Animal> Select(){
        try {
            return animalDao.FindAllAnimals();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public Animal SearchAnimalById(Integer id) {
        try {
            return animalDao.FindAnimalById(id);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public List<Animal> SearchAnimalByType(String type) {
        try {
            return animalDao.FindAnimalByType(type);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public List<Animal> SearchAnimalBySpecific(String specific) {
        try {
            return animalDao.FindAnimalBySpecific(specific);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public List<Animal> SearchAnimal(String keyword) {
        try {
            return animalDao.FindCenternAnimal(keyword);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public boolean AddAnimal(Animal animal) {
        try {
            return animalDao.AddNewAnimal(animal);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public boolean IsAnimalExist(Animal animal){
        try {
            return animalDao.IsAnimalExist(animal);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}
