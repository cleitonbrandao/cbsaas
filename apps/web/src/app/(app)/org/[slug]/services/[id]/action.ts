import { BadRequestError } from '../../../../../../../../api/src/http/routes/_erros/bad-request-error';
import { GetService } from "http/service/get-service";

type GetProductRequest = {
    org: string;
    serviceId: string;
  };
  
  export default async function GetServiceAction({ org, serviceId }: GetProductRequest) {
    const {service} = await GetService({org, serviceId})
    if (!service) {
      throw new BadRequestError('Service not found.');
    }
    return service;
  }
  