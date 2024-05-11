package br.com.api.authapi.repositories;

import br.com.api.authapi.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
}
