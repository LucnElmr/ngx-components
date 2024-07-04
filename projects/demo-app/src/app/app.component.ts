import { MediaMatcher } from '@angular/cdk/layout';
import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnDestroy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';


@Component({
    selector: 'app-root',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
        NgIf,
        NgFor,
        RouterOutlet
    ]
})
export class AppComponent implements OnDestroy {
    protected mobileQuery: MediaQueryList;

    private _mobileQueryListener: () => void;

    private changeDetectorRef = inject(ChangeDetectorRef);
    private media = inject(MediaMatcher);

    public constructor() {
        this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = (): void => this.changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    public ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }
}
