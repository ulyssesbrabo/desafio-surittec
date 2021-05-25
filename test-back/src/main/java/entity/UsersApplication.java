package entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name="usersapplication")
public class UsersApplication  implements Serializable{
	
private static final long serialVersionUID = 1L;
    
    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "user")
    private String loginUser;
    
    @Column(name = "loggedIn")
    private boolean loggedIn;
    
    @Column(name = "password")
    private String password;
    
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name = "perfil_id")
	private List<Perfil> listPerfil = new ArrayList<>();

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getLoginUser() {
		return loginUser;
	}

	public void setLoginUser(String loginUser) {
		this.loginUser = loginUser;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public boolean isLoggedIn() {
		return loggedIn;
	}

	public void setLoggedIn(boolean loggedIn) {
		this.loggedIn = loggedIn;
	}
	
	public List<Perfil> getListPerfil() {
		return listPerfil;
	}

	public void setListPerfil(List<Perfil> listPerfil) {
		this.listPerfil = listPerfil;
	}

	@Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof UsersApplication)) return false;
        UsersApplication user = (UsersApplication) o;
        return Objects.equals(loginUser, user.loginUser) &&
                Objects.equals(password, user.password);
    }
	
	@Override
    public int hashCode() {
        return Objects.hash(id, loginUser, password, 
                            loggedIn);
    }
	
	@Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + loginUser + '\'' +
                ", password='" + password + '\'' +
                ", loggedIn=" + loggedIn +
                '}';
    }

}
