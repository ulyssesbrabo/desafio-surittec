package repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import entity.UsersApplication;

@Repository
public interface UserApplicattionRepository extends JpaRepository<UsersApplication, Long>{

}
