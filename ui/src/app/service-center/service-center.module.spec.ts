import {ServiceCenterModule} from './service-center.module';

describe('ServiceCenterModule', () => {
  let serviceCenterModule: ServiceCenterModule;

  beforeEach(() => {
    serviceCenterModule = new ServiceCenterModule();
  });

  it('should create an instance', () => {
    expect(serviceCenterModule).toBeTruthy();
  });
});
