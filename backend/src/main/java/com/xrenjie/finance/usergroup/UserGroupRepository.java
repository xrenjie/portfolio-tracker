package com.xrenjie.finance.usergroup;

import com.xrenjie.finance.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserGroupRepository extends JpaRepository<UserGroup, Long> {
  List<UserGroup> findAllByOwner(User user);
}
