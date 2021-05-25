package controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import entity.Users;
import repository.UsersRepository;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/users")
public class UsersControllers {
	
	@Autowired
	private UsersRepository userRepo;
	
	@PostMapping
	public Users adicionar(@Valid @RequestBody Users user) {
		return userRepo.save(user);
	}
	
	@GetMapping
	public List<Users> listar() {
		return userRepo.findAll();
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Optional<Users>> buscar(@PathVariable Long id) {
		Optional<Users> contato = userRepo.findById(id);
		
		if (contato == null) {
			return ResponseEntity.notFound().build();
		}
		
		return ResponseEntity.ok(contato);
	}

}
