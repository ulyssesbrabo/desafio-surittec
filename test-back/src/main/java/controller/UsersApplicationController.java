package controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dto.UserLogado;
import entity.UsersApplication;
import enuns.Status;
import repository.UserApplicattionRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/usersApplication")
public class UsersApplicationController {

	@Autowired
	private UserApplicattionRepository userApplicationRepo;
	
	@PostMapping("/register")
    public Status registerUser(@Valid @RequestBody UsersApplication newUser) {
        List<UsersApplication> users = userApplicationRepo.findAll();
		for (UsersApplication user : users) {
		            System.out.println("Registered user: " + newUser.toString());
		            if (user.equals(newUser)) {
		                System.out.println("User Already exists!");
		                return Status.USER_ALREADY_EXISTS;
		            }
		        }
		userApplicationRepo.save(newUser);
        return Status.SUCCESS;
    }
	
	@PostMapping("/login")
    public UserLogado loginUser(@Valid @RequestBody UsersApplication user) {
        List<UsersApplication> users = userApplicationRepo.findAll();
        UserLogado usuLog = new UserLogado();
		for (UsersApplication other : users) {
            if (other.equals(user)) {
                user.setLoggedIn(true);
                userApplicationRepo.save(user);
                
                if (user.getLoginUser().equals("admin")) {
                	usuLog.setStatus(Status.SUCCESS);
                	usuLog.setTipoPerfil("admin");
                	return usuLog;                	
                }else {
                	usuLog.setStatus(Status.SUCCESS);
                	usuLog.setTipoPerfil("comum");
                	return usuLog; 
                }
            }
		}
		usuLog.setStatus(Status.FAILURE);
		usuLog.setTipoPerfil(null);
		
		return usuLog;
    }
	
}
