import { NextFunction, Request, Response } from "express";
import { parse } from "graphql";
import { getCapabilities } from "./handlers/CapabilityHandler";

export const capabilitiesMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (req.path === "/graphql" && Object.keys(req.body).length !== 0) {
        const query: any = parse(req.body.query).definitions[0];
        const selection = query.selectionSet?.selections[0] || {};
        const table = selection.name.value || "";
        const projectDid = selection.selectionSet.selections.filter(
            (sel: any) => {
                sel.name.value === "projectDid";
            },
        )[0];
        if (table === "claims") {
            const userDid = req.headers.authorization || "";
            const capabilities = await getCapabilities(projectDid, userDid);
            const allowed = capabilities.filter((c) => {
                c.capability === "ListClaims" ||
                    c.capability === "ListClaimsByTemplateId";
            });
            if (allowed.length > 0) {
                return next();
            } else {
                return res.json(
                    `User ${userDid} not Allowed on Project ${projectDid}`,
                );
            }
        } else if (table === "agents") {
            const userDid = req.headers.authorization || "";
            const capabilities = await getCapabilities(projectDid, userDid);
            const allowed = capabilities.filter((c) => {
                c.capability === "ListAgents";
            });
            if (allowed.length > 0) {
                return next();
            } else {
                return res.json(
                    `User ${userDid} not Allowed on Project ${projectDid}`,
                );
            }
        }
        return next();
    } else {
        return next();
    }
};
