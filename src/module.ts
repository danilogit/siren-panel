import _ from 'lodash';
import { PanelCtrl } from 'grafana/app/plugins/sdk';

class SirenPanel extends PanelCtrl {
  static templateUrl = 'module.html';
  static scrollable = false;

  stateFilter: any = {};
  enabled: boolean;
  mediaUrl: string;
  alerting: boolean;
  player: any;
  alertHistory: any[] = [];

  // Set and populate defaults
  panelDefaults = {
    alertHistory: [],
    enabled: true,
    stateFilter: ["alerting"],
    folderId: null,
    mediaUrl: '/public/plugins/' + this.pluginId + '/media/alert.mp3',
    alerting: false
  };

  /** @ngInject */
  constructor($scope, $injector, private backendSrv) {
    super($scope, $injector);
    
    _.defaults(this.panel, this.panelDefaults);

    this.events.on('init-edit-mode', this.onInitEditMode.bind(this));
    this.events.on('refresh', this.onRefresh.bind(this));

    for (const key in this.panel.stateFilter) {
      this.stateFilter[this.panel.stateFilter[key]] = true;
    }

  }

  updateStateFilter() {
    const result: any = [];

    for (const key in this.stateFilter) {
      if (this.stateFilter[key]) {
        result.push(key);
      }
    }

    this.panel.stateFilter = result;
    this.onRefresh();
  }


  pushToHistory(alert) {
    this.alertHistory.push(alert);
  }

  isAlertInHistory(alert) {
    return this.alertHistory.find(item => {
      if (item.newStateDate === alert.newStateDate && item.state === alert.state && item.panelId === alert.panelId) {
        return true;
      } else {
        return false;
      }
    })
  }

  fetchAlerts() {

    if (this.panel.enabled === false)
      return;

    const params: any = {
      state: this.panel.stateFilter,
      dashboardId: this.dashboard.id
    };
    
    this.backendSrv.get('/api/alerts', params).then(res => {
      this.panel.alerting = false;
      if (res.length > 0) {
        res.forEach(alert => {
          if (!this.isAlertInHistory(alert)) {
            this.pushToHistory(alert)
            this.panel.alerting = true;
            this.player.play();
          } 
        });
      }

    })
      .then(() => {
        this.renderingCompleted();
      })

    return true;
  }

  link(scope, elem, attrs, ctrl) {
    this.player = elem.find('audio')[0];
  }

  onRefresh() {
    this.fetchAlerts()
  }


  onInitEditMode() {
    this.addEditorTab('Options', 'public/plugins/' + this.pluginId + '/editor.html');
  }
}

export { SirenPanel, SirenPanel as PanelCtrl };
