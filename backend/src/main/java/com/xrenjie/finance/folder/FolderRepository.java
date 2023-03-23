package com.xrenjie.finance.folder;

import com.xrenjie.finance.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface FolderRepository extends JpaRepository<Folder, Long> {
  List<Folder> findAllByUsers(User user);
}
