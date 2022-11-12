package marary.service;

import marary.domain.Log;
import marary.persistence.LogDao;

public class LogService {

    private LogDao logDao;

    public LogService() {
        this.logDao = new LogDao();
    }

    public Log addLog(String username, String information) {
        try {
            return logDao.AddLog(username, information);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
